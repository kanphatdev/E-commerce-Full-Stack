import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Resize from 'react-image-file-resizer';
import { removeFiles, uploadFiles } from '../../api/product';
import useEcomStore from '../../store/ecomerce-store';
import { Loader, Trash } from 'lucide-react';

const UploadFile = ({ form, setForm }) => {
    const token = useEcomStore((state) => state.token);
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (e) => {
        setIsLoading(true);
        const files = e.target.files;
        if (files) {
            // Initialize allFiles as an array, even if form.images is null or undefined
            let allFiles = form.images ? [...form.images] : [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} is not an image`);
                    continue;
                }
                Resize.imageFileResizer(
                    file,
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        uploadFiles(token, data)
                            .then((res) => {
                                allFiles.push(res.data);
                                setForm({
                                    ...form,
                                    images: allFiles,
                                });
                                setIsLoading(false);
                                toast.success('Image uploaded successfully!');
                            })
                            .catch((err) => {
                                setIsLoading(false);
                                toast.error('Failed to upload image');
                            });
                    },
                    "base64"
                );
            }
        }
    };

    const handleDelete = (public_id) => {
        const images = form.images || []; // Ensure images is an array
        removeFiles(token, public_id)
            .then((res) => {
                const filteredImages = images.filter((item) => item.public_id !== public_id);
                setForm({
                    ...form,
                    images: filteredImages,
                });
                toast.error('Image removed');
            })
            .catch((err) => {
                toast.error('Failed to delete image');
            });
    };

    return (
        <div className='my-4'>
            <div className='flex flex-wrap gap-4 my-4'>
                {isLoading && <Loader className='w-16 h-16 animate-spin text-success' />}

                {form.images && form.images.map((item, index) => (
                    <div className='relative' key={index}>
                        <img
                            className='w-24 h-24 rounded-lg border border-gray-300 hover:scale-105 transition-transform'
                            src={item.url}
                            alt={`Uploaded preview ${index + 1}`}
                        />
                        <button
                            onClick={() => handleDelete(item.public_id)}
                            className='absolute top-0 right-0 bg-red-500 p-1 rounded-full text-white hover:bg-red-600 transition'>
                            <Trash className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            <div>
                <input
                    onChange={handleOnChange}
                    type='file'
                    name='images'
                    multiple
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                />
            </div>
        </div>
    );
};

export default UploadFile;

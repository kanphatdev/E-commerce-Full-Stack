import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { useEcomStore } from "../../store/EcomStore";
import { Loader, XCircle } from "lucide-react"; // Lucide icons
import { removeFiles, uploadFiles } from "../../api/uploadimages";

const UploadFile = ({ formData, setFormData }) => {
  const token = useEcomStore((state) => state.token); // Get token from store
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Handle file input change
  const handleOnChange = (e) => {
    setIsLoading(true);
    const files = e.target.files;
    if (files) {
      let allFiles = formData.images || []; // Ensure images array exists
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not an image`);
          continue; // Skip non-image files
        }

        // Resize the image
        Resize.imageFileResizer(
          file,
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            // Upload resized image
            uploadFiles(token, data)
              .then((res) => {
                console.log(res);
                allFiles.push(res.data); // Add uploaded file data to form
                setFormData({
                  ...formData,
                  images: allFiles, // Update images in form data
                });
                setIsLoading(false);
                toast.success("Image uploaded successfully!");
              })
              .catch((err) => {
                console.error(err);
                setIsLoading(false);
                toast.error("Failed to upload image");
              });
          },
          "base64"
        );
      }
    }
  };

  // Handle image delete
  const handleDelete = (public_id) => {
    const images = formData.images || [];
    removeFiles(token, public_id)
      .then((res) => {
        const filteredImages = images.filter((item) => item.public_id !== public_id);
        setFormData({
          ...formData,
          images: filteredImages,
        });
        toast.success("Image deleted successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete image");
      });
  };

  return (
    <div className="my-4">
      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center items-center my-4">
          <Loader className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
      )}

      {/* Display Uploaded Images */}
      <div className="flex flex-wrap gap-4 mx-4 my-4">
        {formData.images &&
          formData.images.map((item, index) => (
            <div className="relative group" key={index}>
              <img
                className="w-24 h-24 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                src={item.url}
                alt={`Uploaded file ${index + 1}`}
              />
              {/* Delete Button */}
              <span
                onClick={() => handleDelete(item.public_id)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XCircle className="w-5 h-5" />
              </span>
            </div>
          ))}
      </div>

      {/* File Upload Input */}
      <div className="mt-4">
        <input
          onChange={handleOnChange}
          type="file"
          name="images"
          multiple
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
        />
      </div>
    </div>
  );
};

export default UploadFile;

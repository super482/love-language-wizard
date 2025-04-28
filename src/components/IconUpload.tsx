
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface IconUploadProps {
  onImageSelect: (file: File) => void;
  icon: React.ReactNode;
  text: string;
}

const IconUpload: React.FC<IconUploadProps> = ({ onImageSelect, icon, text }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageSelect(e.target.files[0]);
    }
  };

  return (
    <div
      className={`w-full flex flex-col items-center justify-center py-8 px-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
        isDragging ? 'border-love bg-love/10' : 'border-white/20 hover:border-white/40'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <div className="mb-4 text-4xl">
        {icon}
      </div>
      <Button className="magic-gradient border-none hover:opacity-90">
        {text}
      </Button>
    </div>
  );
};

export default IconUpload;

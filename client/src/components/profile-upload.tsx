import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, User } from 'lucide-react';

interface ProfileUploadProps {
  value?: string;
  onChange: (imageData: string) => void;
}

export function ProfileUpload({ value, onChange }: ProfileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-foreground">Profile Picture (Optional)</label>

      {value ? (
        <div className="relative w-32 h-32 mx-auto">
          <img
            src={value}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-purple-200 shadow-lg"
          />
          <button
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          className={`profile-upload ${dragOver ? 'border-purple-500 bg-purple-100' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <User className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <p className="text-purple-600 font-medium mb-2">
            Drag & drop your photo here
          </p>
          <p className="text-gray-500 text-sm mb-4">or</p>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </Button>
          <p className="text-xs text-gray-400 mt-2">
            Supports JPG, PNG (Max 5MB)
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
}

export default ProfileUpload; // Default export add kiya gaya
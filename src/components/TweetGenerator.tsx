'use client';
import { useState, ChangeEvent } from 'react';
import Image from 'next/image';

interface TweetFormData {
  name: string;
  username: string;
  text: string;
  photo: string | null;
  verifiedBadge: string;
}

export default function TweetGenerator() {
  const verificationOptions = [
    { value: '', label: 'No Badge', icon: '' },
    { value: 'blue-tick', label: 'Blue Tick', icon: '/blue-tick.svg' },
    { value: 'pink-tick', label: 'Pink Tick', icon: '/pink-tick.svg' },
    { value: 'golden-tick', label: 'Golden Tick', icon: '/golden-tick.svg' },
    { value: 'curly-tick', label: 'Border Tick', icon: '/curly-tick.svg' },
    { value: 'empty-tick', label: 'Gray Tick', icon: '/empty-tick.svg' },
  ];

  const [formData, setFormData] = useState<TweetFormData>({
    name: '',
    username: '',
    text: '',
    photo: null,
    verifiedBadge: ''
  });
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        setFormData(prev => ({
          ...prev,
          photo: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-2xl text-blue-700 font-bold text-3xl text-center mb-6">Tweet Generator</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="text-gray-700 py-3 px-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500">@</span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="text-gray-700 py-3 px-4 block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tweet Text</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              rows={4}
              className="text-gray-700 py-3 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Verification Badge</label>
            <div className="mt-1 grid grid-cols-6 gap-2">
              {verificationOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, verifiedBadge: option.value }))}
                  className={`p-2 rounded-lg border ${
                    formData.verifiedBadge === option.value 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  } flex items-center justify-center h-12`}
                  title={option.label}
                >
                  {option.icon ? (
                    <Image
                      src={option.icon}
                      alt={option.label}
                      width={24}
                      height={24}
                      className="inline-block"
                    />
                  ) : (
                    <span className="text-gray-400">✕</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tweet Preview */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-blue-600 text-lg font-semibold mb-4">Preview</h3>
        <div className="border rounded-xl p-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="h-13 w-13 rounded-full overflow-hidden">
                <Image
                  src={previewImage || '/default-profile.svg'}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 text-xl font-bold">{formData.name || 'Name'}</span>
                {formData.verifiedBadge && (
                  <Image 
                    src={`/${formData.verifiedBadge}.svg`}
                    alt="Verified" 
                    width={20} 
                    height={20} 
                    className="inline-block"
                  />
                )}
              </div>  
              <span className="text-lg text-gray-600">@{formData.username || 'username'}</span>
                
              
              <p className="-ml-17 text-xl text-gray-900 mt-5">{formData.text || 'Your tweet text will appear here'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';

interface ParaProps {
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  description: string;
}

const Para: React.FC<ParaProps> = ({ description, setDescription }) => {
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    
  }, [description]);

  return (
    <div className="mx-aut border-[1px] mt-4 rounded-xl focus:border-blue-600 focus:border-2 outline-none">
      <textarea
        value={description}
        onChange={handleDescriptionChange}
        className="w-full h-40 p-4 focus:border-blue-600"
        placeholder="Enter your text here..."
      />
    </div>
  );
};

export default Para;

import React, { useEffect, useState } from 'react';

const Main = () => {
  const sections = [
    { name: "one" },
    { name: "one" },
    { name: "one" },
    { name: "one" },
    { name: "one" },
  ];

  const [opacity, setOpacity] = useState(Array(sections.length).fill(1));

  const handleScroll = () => {
    const newOpacity = sections.map((_, index) => {
      const element = document.getElementById(`section-${index}`);
      if (!element) return 1;
      const rect = element.getBoundingClientRect();
      return rect.top <= 0 ? 0.5 : 1;
    });
    setOpacity(newOpacity);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="text-center text-5xl font-bold text-blue-500">Scroll Effect</div>
      <div className="w-full flex items-center flex-col mt-5 justify-center">
        {sections.map((item, index) => (
          <div
            key={index}
            id={`section-${index}`}
            className="border-t-2 sticky border-[black] h-[50vh] shadow-lg border bg-green-200 transition-opacity duration-300"
            style={{ 
              top: `${index * 10 +60}px`, 
              opacity: opacity[index], 
              width: `${80 - index * 0.5}%` 
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="w-full h-screen bg-red-400"></div>
      <div className="w-full h-screen bg-red-400"></div>
      <div className="w-full h-screen bg-red-400"></div>
    </>
  );
};

export default Main;

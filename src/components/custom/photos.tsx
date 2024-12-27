'use client';
import Image from 'next/image';
import React from 'react';

type Photo = {
      src: string;
      alt: string;
      width: number;
      height: number;
};

const Photos = ({ src, alt, width, height }: Photo) => {
      const [imgSrc, setImgSrc] = React.useState(src); // remove it when s3 image url is available

      const handleError = () => {
            setImgSrc('/pizza.png'); // Path to your default image
      };
      return <Image src={imgSrc} alt={alt} width={width} height={height} onError={handleError} />;
};

export default Photos;

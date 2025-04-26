import { useEffect, useState } from "react";

const pics = [
    "../backend/images/image0.jpeg" 
    , "../backend/images/image1.jpeg"
    , "../backend/images/image4.jpeg"   
    , "../backend/images/image5.jpeg"
    , "../backend/images/image7.jpeg"

]

function Carosel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % pics.length);
        }, 5000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="carosel" style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
            {pics.map((pic, index) => (
                <img
                    key={index}
                    src={pic}
                    alt={`Slide ${index}`}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: currentIndex === index ? 1 : 0,
                        transition: 'opacity 1s ease-in-out'
                    }}
                />
            ))}
        </div>
    );
}

export default Carosel;
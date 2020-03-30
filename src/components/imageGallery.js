import React, { useState } from 'react';
import { Link } from "gatsby";

import Img from 'gatsby-image/withIEPolyfill';
import { chunk, sum } from 'lodash';

// https://jossmac.github.io/react-images/#/
import Carousel, { Modal, ModalGateway } from 'react-images';

// https://github.com/ReactTraining/react-media
import Media from 'react-media';

const ImageGallery = ({images}) => {
    const [itemsPerRow, setItemsPerRow] = useState(4);
    // Split images into groups of the given size
    const rows = chunk(images, itemsPerRow);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalCurrentIndex, setModalCurrentIndex] = useState(0);
  
    const closeModal = () => setModalIsOpen(false);
    const openModal = (imageIndex) => {
      setModalCurrentIndex(imageIndex);
      setModalIsOpen(true);
    };

    return (
        <div className="image-gallery-block ">
            <Media 
                queries={{
                    small: "(max-width: 599px)",
                    medium: "(min-width: 600px) and (max-width: 799px)",
                    large: "(min-width: 800px)"
                }}
                onChange={matches => {
                    matches.small && setItemsPerRow(2);
                    matches.medium && setItemsPerRow(3);
                    matches.large && setItemsPerRow(4);
                }}
            >
            </Media>

            {rows.map((row, rowIndex) => {
                // Sum aspect ratios of images in the given row
                const rowAspectRatioSum = sum(row.map(image => image.aspectRatio));

                return row.map((image, imageIndexInRow) => (
                    <Link
                        key={image.id}
                        to={image.originalImg}
                        onClick={(e) => {
                            e.preventDefault();
                            openModal((rowIndex * itemsPerRow) + imageIndexInRow);
                        }}
                    >
                        <div className="gallery-img-wrapper" style={{width: `${(image.aspectRatio / rowAspectRatioSum) * 100}%`}}>
                            <Img
                                key={image.src}
                                fluid={image}
                                alt={image.alt}
                                width={`${(image.aspectRatio / rowAspectRatioSum) * 100}%`}
                                css={{ display: 'inline-block' }}
                            />
                        </div>
                    </Link>
                ));
            })}

            {ModalGateway && (
                <ModalGateway>
                {modalIsOpen && (
                    <Modal onClose={closeModal}>
                    <Carousel
                        views={images.map(({ originalImg, caption }) => ({
                        source: originalImg,
                        caption,
                        }))}
                        currentIndex={modalCurrentIndex}
                        // formatters={carouselFormatters}

                    />
                    </Modal>
                )}
                </ModalGateway>
            )}
        </div>
    )
}

export default ImageGallery
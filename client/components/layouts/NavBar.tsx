import { Pagination, Autoplay, Navigation, Parallax } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const NavBar = () => {
    return (
        <div className="components__navbar d-flex justify-content-center">
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                speed={600}
                parallax={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 5500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Parallax, Pagination, Navigation, Autoplay]}
                className="mySwiper"
            >
                <div slot="container-start" className="parallax-bg" data-swiper-parallax="-23%"></div>
                <SwiperSlide>
                    <div className="title" data-swiper-parallax="-300">
                        <strong>Leading Online Event Ticketing Platform</strong>
                    </div>
                    {/* <div className="subtitle" data-swiper-parallax="-200">
                          Introduction to TicketNest:
                    </div> */}
                    <div className="text" data-swiper-parallax="-100">
                        <p>
                            TicketNest is the top online event ticketing platform for concerts and performing arts, offering a fast,
                            user-friendly experience.
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="title" data-swiper-parallax="-300">
                        <strong>Seamless and Secure Ticket Purchasing Experience</strong>
                    </div>
                    <div className="text" data-swiper-parallax="-100">
                        <p>
                            TicketNest's interface simplifies event browsing, seat selection, and secure payments with top providers, backed
                            by responsive support.
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="title" data-swiper-parallax="-300">
                        <strong>Unlock a World of Memorable Experiences</strong>
                    </div>
                    <div className="text" data-swiper-parallax="-100">
                        <p>
                            TicketNest unlocks unforgettable experiences in music and the arts, making attending your favorite events easier
                            and more enjoyable than ever!
                        </p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default NavBar;

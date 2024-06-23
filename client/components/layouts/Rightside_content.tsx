import { images } from '@utils/constants';
import React from 'react';

const Rightside_Content: IRightsideContentComponent<IRightsideContentComponentProps> = () => {
    return (
        <div className="components__Rightside_content">
            <div className="components__Rightside_content-form">
                <div className="components__Rightside_content-form-overlay">
                    <div className="components__Rightside_content-form-overlay-logos">
                        <img
                            className="components__Rightside_content-form-overlay-logos-logo1"
                            style={{ height: '430px' }}
                            src={images.CARD2_LOGO}
                            alt=""
                        />
                        <img
                            className="components__Rightside_content-form-overlay-logos-logo2"
                            style={{ height: '430px' }}
                            src={images.CARD_LOGO}
                            alt=""
                        />
                    </div>
                    <div className="components__Rightside_content-form-overlay-card">
                        <div className="components__Rightside_content-form-overlay-card-visalogo">VISA</div>
                        <div className="components__Rightside_content-form-overlay-card-accounttype">PREMIUM ACCOUNT</div>
                        <br></br>
                        <br></br>
                        <div className="components__Rightside_content-form-overlay-card-cardnumber">5789 **** **** 2847</div>
                        <br></br>
                        <br></br>
                        <div className="components__Rightside_content-form-overlay-card-details">
                            <div className="components__Rightside_content-form-overlay-card-details-holder">
                                <div className="components__Rightside_content-form-overlay-card-details-holder-type">Card Holder</div>
                                <div className="components__Rightside_content-form-overlay-card-details-holder-name">Mike Smith</div>
                            </div>
                            <div className="components__Rightside_content-form-overlay-card-details-expirydate">
                                <div className="components__Rightside_content-form-overlay-card-details-expirydate-date">Expire Date</div>
                                <div className="components__Rightside_content-form-overlay-card-details-expirydate-value">06/21</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="components__Rightside_content-form-frame">
                    <div className="components__Rightside_content-form-frame-stats">
                        <div className="components__Rightside_content-form-frame-stats-item">
                            <div className="components__Rightside_content-form-frame-stats-item-img">
                                <img style={{ height: '32px', width: '32px' }} src={images.START_ITEM} alt="" />
                            </div>
                            <div className="components__Rightside_content-form-frame-stats-item-product">
                                <div className="components__Rightside_content-form-frame-stats-item-product-value">1153</div>
                                <div className="components__Rightside_content-form-frame-stats-item-product-label">Products</div>
                            </div>
                        </div>
                        <div className="components__Rightside_content-form-frame-stats-item">
                            <div className="components__Rightside_content-form-frame-stats-item-img">
                                <img style={{ height: '32px', width: '32px' }} src={images.START_ITEM2} alt="" />
                            </div>
                            <div className="components__Rightside_content-form-frame-stats-item-order">
                                <div className="components__Rightside_content-form-frame-stats-item-order-value2">81K</div>
                                <div className="components__Rightside_content-form-frame-stats-item-order-label2">Order Served</div>
                            </div>
                        </div>
                    </div>

                    <div className="components__Rightside_content-form-frame-growth">
                        <div className="components__Rightside_content-form-frame-growth-lifetimesales">$4,050,12,300</div>{' '}
                        <span className="components__Rightside_content-form-frame-growth-label">YoY 24%</span>
                    </div>
                    <div className="components__Rightside_content-form-frame-content"> Life time sales</div>
                    <div className="components__Rightside_content-form-frame-buttons">
                        <button className="components__Rightside_content-form-frame-buttons-viewproject">View Project</button>
                        <button className="components__Rightside_content-form-frame-buttons-analytics">Analytics</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rightside_Content;

import React from "react";
import InfoItem from "./InfoItem";

const InfoSection = () => {
  return (
    <div className="bg-[#391642] px-16 py-4">
      <InfoItem
        imagePath="/bar-main-sample.jpg"
        buttonPath="/places"
        buttonText="See our places"
        textContent="🍻 Ready to paint the town red? Meet your new best friend: our app! We're like the lovechild of Trip Advisor and your favorite local bar guru. Wondering if that cozy pub is open for a nightcap or if that trendy club is hosting a killer event tonight? We've got you covered! Our small but mighty team is constantly on the hunt for the hottest spots, updating info faster than you can say 'cheers!' So why wait? Dive in and discover your next favorite hangout spot with just a tap. Click below to see our places and start planning your next adventure! 🌟🍹"
      />
      <InfoItem
        imagePath="/club-main-sample.jpg"
        buttonPath="/events"
        buttonText="See our Events"
        textContent="🎉 Ready to party? Say hello to our event guide app! We're your go-to for all things happening in your city. From concerts to art shows, we've got the inside scoop on the hottest events. Our small team keeps you updated so you never miss out! Click below to see what's on and start planning your next adventure! 🌟🎶"
      />
    </div>
  );
};

export default InfoSection;

import React from "react";
import { Link } from "react-router-dom";
import ResponsiveWidthWrapper from "../../components/ResponsiveWidthWrapper/ResponsiveWidthWrapper";
import Button from "../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faEnvelope,
  faBell,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const CharacterDesigns = () => {
  return (
    <div className="w-full flex flex-col items-center gap-8 bg-bg-light py-12 min-h-screen">
      <ResponsiveWidthWrapper>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Character Ball Designs
            </h1>
            <p className="text-xl text-gray-600">
              Learn about available designs and how to request prints
            </p>
          </div>

          {/* Main Content Cards */}
          <div className="flex flex-col gap-6">
            {/* N3D Melbourne Catalog Card */}
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faExternalLinkAlt}
                      className="text-white text-2xl"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Browse 100+ Character Designs
                  </h2>
                  <p className="text-lg text-gray-600">
                    Explore the full N3D Melbourne catalog
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  All character ball designs featured in our store are created
                  by <strong className="text-primary">N3D Melbourne</strong>, a
                  talented designer who has created{" "}
                  <strong>over 100+ unique character ball designs</strong>!
                </p>

                <p className="text-gray-700 leading-relaxed">
                  The products shown in our store are only the ones I've
                  personally printed and photographed. However, you can browse
                  the entire N3D Melbourne design catalog and request any design
                  to be printed for you!
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded my-4">
                  <p className="text-sm text-gray-700">
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                    <strong>Note:</strong> Viewing the N3D Melbourne catalog
                    requires creating a free account on their website.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <a
                    href="https://www.n3dmelbourne.com/dashboard/designs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full flex items-center justify-center gap-2">
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                      View N3D Melbourne Catalog
                    </Button>
                  </a>
                  <Link to="/contact" className="flex-1">
                    <Button className="w-full flex items-center justify-center gap-2 bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white">
                      <FontAwesomeIcon icon={faEnvelope} />
                      Request Custom Print
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Waitlist Card */}
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faBell}
                      className="text-white text-2xl"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Join the Waitlist
                  </h2>
                  <p className="text-lg text-gray-600">
                    Get notified when your favorite character is available
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Can't find your favorite characters design in the N3D
                  Melbourne catalog? No problem! You can request to be added to
                  my personal waitlist.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  When a design for your requested character becomes available
                  (either from N3D Melbourne or other creators), I'll contact
                  you right away so you can be among the first to get it!
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded my-4">
                  <p className="text-sm text-gray-700">
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                    <strong>Important:</strong> Please note that there are no
                    guarantees if or when specific character designs will be
                    created or become available. This is a notification service
                    only.
                  </p>
                </div>

                <div className="pt-4">
                  <Link to="/contact" className="block">
                    <Button className="w-full flex items-center justify-center gap-2">
                      <FontAwesomeIcon icon={faBell} />
                      Join Waitlist
                    </Button>
                  </Link>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Use the "Waitlist" subject when contacting us
                  </p>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-r from-primary-lighter/10 to-blue-50 rounded-lg p-8 border border-primary-lighter/30">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                How It Works
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
                    1
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Browse Designs
                  </h4>
                  <p className="text-sm text-gray-600">
                    Check the N3D Melbourne catalog for available character ball
                    designs
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
                    2
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Request or Join Waitlist
                  </h4>
                  <p className="text-sm text-gray-600">
                    Found your design? Request a custom print. Don't see it?
                    Join the waitlist
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
                    3
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Get Your Ball
                  </h4>
                  <p className="text-sm text-gray-600">
                    I'll print your design and contact you when it's ready or
                    available
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Store */}
          <div className="text-center mt-12">
            <Link to="/store">
              <Button className="px-8">Back to Store</Button>
            </Link>
          </div>
        </div>
      </ResponsiveWidthWrapper>
    </div>
  );
};

export default CharacterDesigns;

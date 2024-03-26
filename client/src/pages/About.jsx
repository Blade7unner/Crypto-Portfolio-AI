import React from 'react';


//Template taken from https://tailgrids.com/components/cards
const About = () => {
  return (
    <>

      <section className="bg-gray-2 pb-10 dark:bg-dark lg:pb-20 lg:pt-[120px]"> {/* Removed pt-20 class */}
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <SingleCard
              image="https://www.personalfinancelab.com/wp-content/uploads/stock-chart.jpg"
              CardTitle="50+ Best creative website themes & templates"
              titleHref="/#"
              btnHref="/#"
              CardDescription="Get current stock prices and historical data!"
              Button="View Details"
            />
            <SingleCard
              image="https://www.valuespreadsheet.com/images/when-to-buy-sell-stocks.jpg"
              CardTitle="Creative Card Component designs graphic elements"
              titleHref="/favorites"
              btnHref="/favorites"
              CardDescription="Get a recommendation on whether to buy or sell your favorite stocks!"
              Button="View Details"
            />
            <SingleCard
              image="https://www.cnet.com/a/img/resize/9a13e1e92a7b66cbff9db2934b3f66bf01a4afb6/hub/2023/08/24/821b0d86-e29b-4028-ac71-ef63ca020de8/gettyimages-1472123000.jpg?auto=webp&fit=crop&height=675&width=1200"
              CardTitle="The ultimate UX and UI guide to card design"
              titleHref="/AI"
              btnHref="/AI"
              CardDescription="Use AI to transform your stock buying and selling to make the best decisions!"
              Button="View Details"
            />
          </div>
        </div>
      </section>
    </>
  );
};

const SingleCard = ({
  image,
  Button,
  CardDescription,
  CardTitle,
  titleHref,
  btnHref,
}) => {
  return (
    <>
      <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
        <div className="h-64"> {/* Set a fixed height for the image container */}
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover" // Apply object-cover to maintain aspect ratio and cover the entire container
          />
        </div>
        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
          <h3>
            <a
              href={titleHref ? titleHref : "/#"}
              className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
            >
              {CardTitle}
            </a>
          </h3>
          <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
            {CardDescription}
          </p>

          {Button && (
            <a
              href={btnHref ? btnHref : "#"}
              className="inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
            >
              {Button}
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default About;

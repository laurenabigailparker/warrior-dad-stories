import CarouselImageManagement from "../../components/admin/CarouselImageManagement";

function AboutCarouselManagement() {
  return (
    <CarouselImageManagement
      title="About Page Carousel"
      tableName="about_carousel_images"
      uploadFolder="about-carousel"
      addTitle="Add About Carousel Image"
      saveLabel="Save About Image"
      back="/admin/dashboard"
    />
  );
}

export default AboutCarouselManagement;
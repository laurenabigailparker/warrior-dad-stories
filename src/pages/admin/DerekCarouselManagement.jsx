import CarouselImageManagement from "../../components/admin/CarouselImageManagement";

function DerekCarouselManagement() {
  return (
    <CarouselImageManagement
      title="Derek Page Carousel"
      tableName="about_carousel_images"
      uploadFolder="derek-carousel"
      addTitle="Add Derek Carousel Image"
      saveLabel="Save Derek Image"
      back="/admin/dashboard"
      page="derek"
    />
  );
}

export default DerekCarouselManagement;
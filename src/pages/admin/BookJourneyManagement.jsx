import CarouselImageManagement from "../../components/admin/CarouselImageManagement";

function BookJourneyManagement() {
  return (
    <CarouselImageManagement
      title="Warrior Dad Book Feature Carousel"
      tableName="book_journey_images"
      uploadFolder="book-journey"
      addTitle="Add Book Journey Image"
      saveLabel="Save Book Journey Image"
      back="/admin/dashboard"
      page="book-journey"
    />
  );
}

export default BookJourneyManagement;
import { ref, onMounted } from "vue";
import axios from "axios";

//   import { useRouter } from 'vue-router';
export default (await import("vue")).defineComponent({
  components: {
    EditModal,
  },
  setup() {
    const course = ref([]);
    const editingCourse = ref(null);
    const editedCourse = ref({
      name: "",
      title: "",
      grade: "",
      image: null, // Use null to represent the file object
    });

    //   const router = useRouter();
    const getCourse = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/getAllCourse"
        );
        // console.log(response.data.Course);
        course.value = response.data.Course;
      } catch (error) {
        console.error(error);
      }
    };

    const editCourse = (id) => {
      // Find the course to edit based on the ID
      editingCourse.value = id;
      const courseToEdit = course.value.find((c) => c.id === id);
      editedCourse.value = {
        name: courseToEdit.name,
        title: courseToEdit.title,
        grade: courseToEdit.grade,
        image: courseToEdit.image, // Assume you already have an image URL in the database
      };
    };

    const openEditModal = (courseToEdit) => {
      editingCourse.value = true;
      editedCourse.value = {
        name: courseToEdit.name,
        title: courseToEdit.title,
        grade: courseToEdit.grade,
        image: courseToEdit.image,
      };
    };
    const updateCourse = async () => {
      try {
        // Send a PUT request to update the course on the server
        // const message = `
        // Course Name: ${editedCourse.value.name}
        // Course Title: ${editedCourse.value.title}
        // Image URL: ${editedCourse.value.image ? `http://127.0.0.1:8000/storage/${editedCourse.value.image}` : 'No Image'}
        // Grade: ${editedCourse.value.grade}
        // `;
        //  // Display the message in an alert
        // alert(message);
        const formData = new FormData();
        formData.append("name", editedCourse.value.name);
        formData.append("title", editedCourse.value.title);
        formData.append("grade", editedCourse.value.grade);

        // If an image file is selected, append it to the form data
        if (editedCourse.value.image instanceof File) {
          formData.append("image", editedCourse.value.image);
        }

        await axios.put(
          `http://127.0.0.1:8000/api/updateCourse/${editingCourse.value}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Successfully Updated");
        // Reset editingCourse and reload the course list
        editingCourse.value = null;
        getCourse();
      } catch (error) {
        console.error(error);
      }
    };

    const cancelEdit = () => {
      // Cancel the edit and reset editingCourse
      editingCourse.value = null;
    };

    const handleImageChange = (event) => {
      // Update the editedCourse.image with the selected file
      const file = event.target.files[0];
      if (file) {
        editedCourse.value.image = file;
      }
    };

    const deleteProduct = async (id) => {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/productdelete/${id}`);
        console.log("Successfully Deleted");
        alert("Successfully Deleted");
        // Optional: Reload the product list after deletion
        getCourse();
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      getCourse();
    });

    return {
      course,
      deleteProduct,
      editCourse,
      updateCourse,
      cancelEdit,
      editingCourse,
      editedCourse,
      handleImageChange,
    };
  },
});

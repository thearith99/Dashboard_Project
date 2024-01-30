<template>
    <div class="container">
      <table class="sub-container">
        <tr>
            <th>No</th>
            <th>Course Name</th>
            <!-- <th scope="col">Course Title</th> -->
            <th> Image</th>
            <th>Action</th>
        </tr>
        <tr v-for="(pdata, index) in course" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ pdata.name }}</td>
            <td class="px-12 py-4 text-center">
                <img :src="`http://127.0.0.1:8000/storage/${pdata.image}`" alt="" class="image" />
            </td>
            <td class="px-6 py-4 text-center">
              <button @click="editCourse(pdata.id)" class="btn btn-primary">Edit</button>
              <button @click="deleteProduct(pdata.id)" class="btn btn-danger">Delete</button>
            </td>
        </tr>
        <!-- Add a form or modal for editing -->
        <tr v-if="editingCourse">
          <td colspan="4">
            <form @submit.prevent="updateCourse">
              <!-- Add form fields for editing -->
              <input v-model="editedCourse.name" type="text" placeholder="Course Name" required />
              <input v-model="editedCourse.title" type="text" placeholder="Course Title" required />
              <input v-model="editedCourse.image" type="text" placeholder="Image URL" required />
              <input type="file" id="image" @change="handleImageChange" accept="image/*" />
              <!-- Display a preview of the selected image if needed -->
              <img v-if="editedCourse.image" :src="`http://127.0.0.1:8000/storage/${editedCourse.image}`" alt="Image Preview" class="image-preview" />
              <select v-model="editedCourse.grade" id="grade" required>
                <option value="1">Year Two</option>
                <option value="2">Year Three</option>
                <option value="3">Year Four</option>
                <option value="4">Year Five</option>
              </select>
              <button type="submit" class="btn btn-success">Save Changes</button>
              <button @click="cancelEdit" class="btn btn-secondary">Cancel</button>
            </form>
          </td>
        </tr>
      </table>
    </div>
  </template>
  
<script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
//   import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const course = ref([]);
      const editingCourse = ref(null);
      const editedCourse = ref({
        name: '',
        title: '',
        grade: '',
        image: null, // Use null to represent the file object
      });

      //   const router = useRouter();
  
      const getCourse = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/getAllCourse');
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

      const updateCourse = async () => {
        try {
          // Send a PUT request to update the course on the server
          const message = `
          Course Name: ${editedCourse.value.name}
          Course Title: ${editedCourse.value.title}
          Image URL: ${editedCourse.value.image ? `http://127.0.0.1:8000/storage/${editedCourse.value.image}` : 'No Image'}
          Grade: ${editedCourse.value.grade}
          `;

           // Display the message in an alert
          alert(message);
          
          const formData = new FormData();
          formData.append('name', editedCourse.value.name);
          formData.append('title', editedCourse.value.title);
          formData.append('grade', editedCourse.value.grade);
          
          // If an image file is selected, append it to the form data
          if (editedCourse.value.image instanceof File) {
            formData.append('image', editedCourse.value.image);
          }

          await axios.put(`http://127.0.0.1:8000/api/updateCourse/${editingCourse.value}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          alert('Successfully Updated');
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
          console.log('Successfully Deleted');
          alert('Successfully Deleted');
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
  };
</script>
<style scoped>
  *{
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
  }
  .sub-container{
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  .sub-container td, .sub-container th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  .sub-container tr:nth-child(even){background-color: #f2f2f2;}

  .sub-container tr:hover {background-color: #ddd;}

  .sub-container th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04AA6D;
    color: white;
  } tr:nth-child(even){background-color: #f2f2f2;}

  .sub-container tr:hover {background-color: #ddd;}

  .sub-container th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: black;
  color: white;
  }
  .image{
    width: 70px;
    height: 50px;
    align-items: center;
    display: flex;
    justify-content: center;
    margin: auto;
  }
  .btn {
    display: inline-block;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }

  .btn-success {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
  }

  .btn-danger {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
  }
  .image-preview{
    width: 300px;
    height: 200px;
  }
</style>

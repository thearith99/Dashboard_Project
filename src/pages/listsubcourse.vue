<template>
    <div class="container">
      <table class="sub-container">
        <tr>
            <th>No</th>
            <th>SubCourse Name</th>
            <!-- <th scope="col">Course Title</th> -->
            <th> Lesson File Path</th>
            <th>Action</th>
        </tr>
        <tr v-for="(pdata, index) in subcourse" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ pdata.name }}</td>
            <td class="px-12 py-4 text-center">
                {{ pdata.lesson_file_path }}
            </td>
            <td class="px-6 py-4 text-center">
              <button @click="editCourse(pdata.id)" class="btn btn-primary">Edit</button>
              <button @click="deleteProduct(pdata.id)" class="btn btn-danger">Delete</button>
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
      const subcourse = ref([]);

      //   const router = useRouter();
  
      const getSubCourse = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/getAllSubCourse');
        //   console.log(response.data.subcourses);
          subcourse.value = response.data.subcourses;
        } catch (error) {
          console.error(error);
        }
      };
      onMounted(() => {
        getSubCourse();
      });
  
      return {
        subcourse,
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

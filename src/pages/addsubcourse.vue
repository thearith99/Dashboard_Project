<template>
    <div class="container">
      <h5>Add SubCourse</h5>
      <p>{{ message }}</p>
        <div>
            <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
              <label>SubCourse name</label>
              <input v-model="txtname" type="text" placeholder="Course name.."/>
              <label>SubCourse File PDF</label>
              <input type="file" @change="handleFileChange" />
              <label>Course</label>
              <select v-model="course_id">
                  <option value="1">Web Design</option>
                  <option value="2">Database</option>
                  <option value="3">Year Four</option>
                  <option value="4">Year Five</option>
                </select>
              <button type="submit" class="btn btn-success">Submit</button>
          </form>
        </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  // import 'bootstrap/dist/css/bootstrap.min.css';
  // import 'bootstrap/dist/js/bootstrap.bundle.min.js';
  export default {
    data() {
      return {
        txtname: '',
        filepdf: null,
        course_id: null, // New property for course_id
        message: '',
      };
    },
    methods: {
      async uploadSubCourse() {
        const formData = new FormData();
        formData.append('name', this.txtname);
        formData.append('lesson_file_path', this.filepdf);
        formData.append('course_id', this.course_id); // Append course_id to formData
  
        try {
          const response = await axios.post("http://127.0.0.1:8000/api/createSubCourse", formData, {
            headers: { 'Content-Type': "multipart/form-data" },
          });
  
          console.log(response);
          this.message = response.message; //"message": "Course successfully created."
  
          setTimeout(() => {
            this.$router.push('/listsubcourse');
          }, 2000);
        } catch (error) {
          console.error(error);
          // Handle error
        }
      },  
      handleFileChange(event) {
        this.filepdf = event.target.files[0];
      },
      async handleSubmit() {
        await this.uploadSubCourse();
      },
    },
  };
  </script>
  
  <style scoped>
  .container{
    width: 70%;
    height: 600px;
    background-color: #f2f2f2;
    margin: auto;
    margin-top: 20px;
    display: block;
  }
  h5{
    font-size: 30px;
    color: black;
    /* font-family: 'Times New Roman'; */
  }
  
  div{
    border-radius: 5px;
    background-color: white;
    padding: 20px;
    width: 90%;
    height: 500px;
    margin: auto;
    /* display: block; */
  }
  input[type=text], select{
    width: 100%;
    height: 50px;
    padding: 12px 20px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
  }
  input[type=file]{
    display: flex;
  }
  button[type=submit] {
    width: 50%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
  }
  label{
    font-size: 17px;
    display: flex;
    padding: 10px 0px;
  }
  button[type=submit]:hover {
    background-color: #45a049;
  }
  
  </style>
  
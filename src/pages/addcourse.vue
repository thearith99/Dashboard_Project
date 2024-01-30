<template>
  <div class="container">
    <h5>Add Course</h5>
    <p>{{ message }}</p>
      <div>
          <form @submit.prevent="handleSubmit">
            <label>Course name</label>
            <input v-model="txtname" type="text" placeholder="Course name.."/>
            <label>Course Title</label>
            <input v-model="txtdescription" type="text"  placeholder="Course title.."/>
            <label>Course Image</label>
            <input type="file" @change="handleFileChange" />
            <label>Grade</label>
            <select v-model="grade_id">
                <option value="1">Year Two</option>
                <option value="2">Year Three</option>
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
      txtdescription: '',
      fileimage: null,
      grade_id: null, // New property for grade_id
      message: '',
    };
  },
  methods: {
    async uploadCourse() {
      const formData = new FormData();
      formData.append('name', this.txtname);
      formData.append('title', this.txtdescription);
      formData.append('image', this.fileimage);
      formData.append('grade_id', this.grade_id); // Append grade_id to formData

      try {
        const response = await axios.post("http://127.0.0.1:8000/api/createCourse", formData, {
          headers: { 'Content-Type': "multipart/form-data" },
        });

        console.log(response);
        this.message = response.message; //"message": "Course successfully created."

        setTimeout(() => {
          this.$router.push('/listcourse');
        }, 2000);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    },  
    handleFileChange(event) {
      this.fileimage = event.target.files[0];
    },
    async handleSubmit() {
      await this.uploadCourse();
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

<template>
  <h1>Dashboard</h1>
  <div class="dashborad_container">
    <div class="dashborad_user">
      <p><i class="fa-solid fa-users"></i> Total Users</p>
      <h2>{{ totalUserIds }}</h2>
    </div>
    <div class="dashborad_course">
      <p><i class="fa-solid fa-book"></i> Total Courses</p>
      <h2>{{ totalCourseIds }}</h2>
    </div>
    <div class="dashborad_download">
      <p><i class="fa-solid fa-circle-down"></i> Total Downloads</p>
      <h2>0</h2>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  data() {
    return {
      users: [],
      courses: [],
    }
  },
  computed: {
    totalUserIds() {
      return this.users.length;
    },
    totalCourseIds() {
      return this.courses.length;
    },
  },
  mounted() {
    this.getAllUsers();
    this.getAllCourses();
  },
  methods: {
    async getAllUsers() {
      const apiUrl = 'http://127.0.0.1:8000/api/getAllUser';

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log('Fetched data:', data);
        this.users = data; // Assuming the API response is an array of user objects
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    async getAllCourses() {
      const apiUrl = 'http://127.0.0.1:8000/api/getAllCourse';

      try {
        const response = await axios.get(apiUrl);
        this.courses = response.data.Course;
        // console.log('Fetched courses:', this.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    },
  },
}
</script>

<style scoped>
h1{
  font-size: 30px;
  padding-bottom: 10px;
}
.dashborad_container{
  width: 95%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  /* background-color: black; */
  border: 1px  gray;
  border-radius: 10px;
  gap: 10px;
}
.dashborad_user{
  width: 33%;
  height: 100%;
  background-color: rgb(247, 135, 154);
  border: 1px  gray;
  border-radius: 10px;
  box-shadow: 10px 10px 5px #aaaaaa;
}
p{
  font-size: 25px;
  color: white;
  font-weight: bold;
  padding-top: 10px;
}
p i{
  color: black;
  font-size: 23px;
  padding: 0px 2px;
}
h2{
  font-size: 30px;
  color: white;
  font-weight: bold;
  padding-top: 70px;
}
.dashborad_course{
  width: 33%;
  height: 100%;
  background-color: rgb(85, 85, 241);
  border: 1px  gray;
  border-radius: 10px;
  box-shadow: 10px 10px 5px #aaaaaa;
}
.dashborad_download{
  width: 33%;
  height: 100%;
  background-color: rgb(180, 152, 206);
  border: 1px  gray;
  border-radius: 10px;
  box-shadow: 10px 10px 5px #aaaaaa;
}
</style>
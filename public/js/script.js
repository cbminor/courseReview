$('#myModal').on('shown.bs.modal', function() {
  $('#myInput').trigger('focus')
})

var app = new Vue({
  el: '#app',
  data: {
    currentCourse: null,
    courseIDsearch: '',
    departmentSearch: '',
    titleSearch: '',
    creditsSearch: '',
    courses: [],
    prereqs: '',
    whenOffered: '',
    professor: '',
    newCourse: {
      title: '',
      courseID: '',
      professors: [],
      description: '',
      department: '',
      whenOffered: [],
      prereqs: [],
      credits: 0,
      reviews: [],
      averageEnjoyability: 0,
      averageInterest: 0,
      averageDifficulty: 0,
      averageTime: 0,
    },
    newReview: {
      enjoyability: 0,
      difficulty: 0,
      interest: 0,
      time: 0,
      professor: '',
      review: '',
      date: '',
    },
  },
  created() {
    this.getCourses();
  },
  computed: {
    filterCourses() {
      var courses = this.courses;
      console.log(courses);
      if (this.courseIDsearch != '') {
        courses = courses.filter(course => {
          return course.courseID.includes(this.courseIDsearch);
        })
      }
      if (this.departmentSearch != '') {
        // this.departmentSearch = '';
        courses = courses.filter(course => {
          return course.department.includes(this.departmentSearch);
        })
      }
      if (this.titleSearch != '') {
        // this.titleSearch = '';
        courses = courses.filter(course => {
          return course.title.includes(this.titleSearch);
        })
      }
      if (this.creditsSearch != '') {
        // this.creditsSearch = '';
        courses = courses.filter(course => {
          return Number(course.credits) === Number(this.creditsSearch);
        })
      }
      return courses;
    },
    getReviews() {
      if (this.currentCourse != null) {
        return this.currentCourse.reviews;
      }
      return [];
    },
    getWhenOffered() {
      return this.newCourse.whenOffered;
    },
    getPrereqs() {
      return this.newCourse.prereqs;
    },
    getProfessors() {
      return this.newCourse.professors;
    },
    geteditwhenoffered() {
      return this.currentCourse.whenOffered;
    },
    geteditprereqs() {
      return this.currentCourse.prereqs;
    },
    geteditprofessors() {
      return this.currentCourse.professors;
    }
  },
  methods: {
    async getCourses() {
      try {
        let response = await axios.get('/api/courses');
        this.courses = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    searchCourses() {
      this.currentCourse = null;
    },
    loadCourse(course) {
      this.currentCourse = course;
      this.courseIDsearch = '';
      this.departmentSearch = '';
      this.titleSearch = '';
      this.creditsSearch = '';
    },
    async submitReview(course) {
      this.currentCourse.reviews.push(this.newReview);
      let r1 = await axios.put('/api/courses/' + this.currentCourse._id, {
        title: this.currentCourse.title,
        courseID: this.currentCourse.courseID,
        professors: this.currentCourse.professors,
        description: this.currentCourse.description,
        department: this.currentCourse.department,
        whenOffered: this.currentCourse.whenOffered,
        prereqs: this.currentCourse.prereqs,
        credits: this.currentCourse.credits,
        reviews: this.currentCourse.reviews,
        averageEnjoyability: this.currentCourse.averageEnjoyability,
        averageInterest: this.currentCourse.averageInterest,
        averageDifficulty: this.currentCourse.averageDifficulty,
        averageTime: this.currentCourse.averageTime,
      })
      this.newReview = {
        enjoyability: 0,
        difficulty: 0,
        interest: 0,
        time: 0,
        professor: '',
        review: '',
        date: '',
      }
    },
    async addCourse() {
      try {
        let r1 = await axios.post('/api/courses', {
          title: this.newCourse.title,
          courseID: this.newCourse.courseID,
          professors: this.newCourse.professors,
          description: this.newCourse.description,
          department: this.newCourse.department,
          whenOffered: this.newCourse.whenOffered,
          prereqs: this.newCourse.prereqs,
          credits: this.newCourse.credits,
        });
        this.getCourses();
        this.newCourse = {
          title: '',
          courseID: '',
          professors: [],
          description: '',
          department: '',
          whenOffered: [],
          prereqs: [],
          credits: 0,
          reviews: [],
          averageEnjoyability: 0,
          averageInterest: 0,
          averageDifficulty: 0,
          averageTime: 0,
        }
      } catch (error) {
        console.log(error);
      }
    },
    async editCourse() {
      try {
        console.log(this.currentCourse);
        let r1 = await axios.put('/api/courses/' + this.currentCourse._id, {
          title: this.currentCourse.title,
          courseID: this.currentCourse.courseID,
          professors: this.currentCourse.professors,
          description: this.currentCourse.description,
          department: this.currentCourse.department,
          whenOffered: this.currentCourse.whenOffered,
          prereqs: this.currentCourse.prereqs,
          credits: this.currentCourse.credits,
          reviews: this.currentCourse.reviews,
          averageEnjoyability: this.currentCourse.averageEnjoyability,
          averageInterest: this.currentCourse.averageInterest,
          averageDifficulty: this.currentCourse.averageDifficulty,
          averageTime: this.currentCourse.averageTime,
        })
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCourse() {
      try {
        console.log(this.currentCourse);
        let response = await axios.delete('/api/courses/' + this.currentCourse._id);
        this.currentCourse = null;
        this.getCourses();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    addprereq() {
      this.newCourse.prereqs.push(this.prereqs);
      this.prereqs = '';
    },
    addoffered() {
      this.newCourse.whenOffered.push(this.whenOffered);
      this.whenOffered = '';
    },
    addProfessor() {
      this.newCourse.professors.push(this.professor);
      this.professor = '';
    },
    editprofessor() {
      this.currentCourse.professors.push(this.professor);
      this.professor = '';
    },
    editoffered() {
      this.currentCourse.whenOffered.push(this.whenOffered);
      this.whenOffered = '';
    },
    editprereq() {
      this.currentCourse.prereqs.push(this.prereqs);
      this.prereqs = '';
    }

  }
})
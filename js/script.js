var app = new Vue({
  el: '#app',
  data: {
    currentCourse: null,
    courseIDsearch: '',
    departmentSearch: '',
    titleSearch: '',
    creditsSearch: '',
    courses: [{
        title: "Web Programming",
        courseID: "CS 260",
        professors: ["Daniel Zapalla"],
        description: "Introduction to web application design and implementation. Both front end and back end development with an emphasis on REST architectures.",
        department: "Computer Science",
        whenOffered: ["Fall", "Winter"],
        prereqs: ["CS 260"],
        credits: 3,
        reviews: []
      },
      {
        title: "Genetics",
        courseID: "PWS 340",
        professors: ["Dr. Maughn"],
        description: "Genetic mechanisms, their fundamental nature, interactions, and applications to human affairs. Genetics in quantitative terms. Extensive practice in problem solving.",
        department: "Plant and Wildlife Sciences",
        whenOffered: ["Fall", "Winter"],
        prereqs: ["MMBIO 240"],
        credits: 3,
        reviews: []
      }
    ],
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
  computed: {
    filterCourses() {
      var courses = this.courses;
      // console.log(courses);
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


  },
  methods: {
    searchCourses() {
      this.currentCourse = null;
    },
    loadCourse(course) {
      this.currentCourse = course;
      this.courseIDsearch = '';
      this.departmentSearch = '';
      this.titleSearch = '';
      this.creditsSearch = '';
    }
  }
})
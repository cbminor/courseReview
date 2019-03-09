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
        reviews: [],
        averageEnjoyability: 0,
        averageInterest: 0,
        averageDifficulty: 0,
        averageTime: 0,
      },
      {
        title: "Adv Programming Concepts",
        courseID: "CS 240",
        professors: ["Jerod Wilkerson", "Cory Barker"],
        description: "Advanced software development with an object-oriented focus. Design, implementation, and testing of several large programs in a Java and Linux environment using current technologies.",
        department: "Computer Science",
        whenOffered: ["Fall", "Winter", "Spring", "Summer"],
        prereqs: ["CS 236"],
        credits: 4,
        reviews: [],
        averageEnjoyability: 0,
        averageInterest: 0,
        averageDifficulty: 0,
        averageTime: 0,
      },
      {
        title: "Computational Biology",
        courseID: "BIO 365",
        professors: ["Stephen Piccolo"],
        description: "	Students will develop skills in preparing, analyzing, and interpreting biological data sets so they can make well-supported scientific conclusions and effectively evaluate scientific conclusions made by others. Students will become familiar with genomic, transcriptomic, phenotypic and environmental data and will apply appropriate computational tools for analyzing data and execute algorithms effectively.",
        department: "Biology",
        whenOffered: ["Fall"],
        prereqs: ["BIO 165", "CS 240"],
        credits: 3,
        reviews: [],
        averageEnjoyability: 0,
        averageInterest: 0,
        averageDifficulty: 0,
        averageTime: 0,
      },
      {
        title: "Technical Communication",
        courseID: "ENGL 316",
        professors: ["Toni E. Pilcher", "Jonathan Balzotti", "Rachel Lott", "Craig Laurence"],
        description: "	Effective processes of written, oral, and visual technical communication, including collaborative processes. Writing for academic and professional audiences.",
        department: "English",
        whenOffered: ["Fall", "Winter"],
        prereqs: [],
        credits: 3,
        reviews: [],
        averageEnjoyability: 0,
        averageInterest: 0,
        averageDifficulty: 0,
        averageTime: 0,
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
        reviews: [],
        averageEnjoyability: 0,
        averageInterest: 0,
        averageDifficulty: 0,
        averageTime: 0,
      },
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
    getReviews() {
      if (this.currentCourse != null) {
        return this.currentCourse.reviews;
      }
      return [];
    }


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
    },
    submitReview(course) {
      course.reviews.push(this.newReview);
      this.newReview = {
        enjoyability: 0,
        difficulty: 0,
        interest: 0,
        time: 0,
        professor: '',
        review: '',
        date: '',
      }
    }
  }
})
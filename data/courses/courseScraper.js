var items = $('.course_index').find('li').map(function() {
  var item = { };

  var course = $(this).text();

  var newArray = course.split(' ');

  console.log(newArray)
  var courseCode = ''
  var courseName = ''
  for(i=0; i < (newArray[0].length - 1); i++){
    console.log(courseCode);
    courseCode += newArray[0][i]
  }
  for(j=1; j < newArray.length; j++){
    courseName = courseName  + newArray[j]
    if(j != newArray.length - 1){
      courseName += ' '
    }
  }
  item.courseCode = courseCode;
  item.courseName = courseName

  return item;
})

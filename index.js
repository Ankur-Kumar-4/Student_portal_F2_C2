

// search function

let allStudentData;
let filteredDataOriginal;

let inputValue;

document.getElementById("input").addEventListener("change", (ev) => {
  inputValue = ev.target.value;
});

const searchBtn = document.getElementById("search_btn");

searchBtn.addEventListener("click", (event) => {
  

  filteredDataOriginal = allStudentData.filter((val) => {
    if (val.first_name.toLowerCase().includes(inputValue)) {
      return val;
    } else if (val.last_name.toLowerCase().includes(inputValue)) {
      return val;
    } else if (val.email.toLowerCase().includes(inputValue)) {
      return val;
    } else {
    }
  });
  add_data(filteredDataOriginal);
});
//
// sort buttons
const sort_AtoZ = document.getElementById("sort_AtoZ");
const sort_ZtoA = document.getElementById("sort_ZtoA");
const sort_marks = document.getElementById("sort_marks");
const sort_passing = document.getElementById("sort_passing");
const sort_Class = document.getElementById("sort_Class");
const sort_gender = document.getElementById("sort_gender");
//

// add event to sortButtons

// sort data from A to Z
sort_AtoZ.addEventListener("click", () => {
  filteredDataOriginal = [...allStudentData];
  filteredDataOriginal = filteredDataOriginal.sort((a, b) => {
    if (a.first_name < b.first_name) {
      return -1;
    }
    if (a.first_name > b.first_name) {
      return 1;
    }
    return 0;
  });
  
  add_data(filteredDataOriginal);
});

// sort data from Z to A
sort_ZtoA.addEventListener("click", () => {
  filteredDataOriginal = [...allStudentData];
  filteredDataOriginal = filteredDataOriginal.sort((a, b) => {
    if (a.first_name > b.first_name) {
      return -1;
    }
    if (a.first_name < b.first_name) {
      return 1;
    }
    return 0;
  });
  
  add_data(filteredDataOriginal);
});

// sort data by marks
sort_marks.addEventListener("click", () => {
  filteredDataOriginal = [...allStudentData];
  filteredDataOriginal = filteredDataOriginal.sort((a, b) => a.marks - b.marks);
  
  add_data(filteredDataOriginal);
});

// sort data by checking whether pass or not
sort_passing.addEventListener("click", () => {
  filteredDataOriginal = [...allStudentData];
  filteredDataOriginal = filteredDataOriginal.filter((a) => a.passing);
 
  add_data(filteredDataOriginal);
});

// sort by class
sort_Class.addEventListener("click", () => {
  filteredDataOriginal = [...allStudentData];
  filteredDataOriginal = filteredDataOriginal.sort((a, b) => a.class - b.class);
  
  add_data(filteredDataOriginal);
});

// sort by gender
sort_gender.addEventListener("click", () => {
  filteredDataOriginal = [...allStudentData];
  console.log("sort_By_gender");
  let femaleData = [];
  let maleData = [];
  let others = [];
  allStudentData.forEach((g) => {
    if (g.gender.toLowerCase() == "female") {
      femaleData.push(g);
    } else if (g.gender.toLowerCase() == "male") {
      maleData.push(g);
    } else {
      others.push(g);
    }
  });
  filteredData = [...femaleData, ...maleData, ...others];
  
  add_data(filteredData);
});

// adding data to the table
const tableBody = document.getElementById("data_tableBody");

fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    allStudentData = data;
    filteredDataOriginal = data;
    add_data(filteredDataOriginal);
  });

function add_data(filteredData) {
  let tableBody = document.getElementById("data_tableBody");
 
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
  for (let i = 0; i < filteredData.length; i++) {
    let tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${filteredData[i].id}</td>
        <td>${filteredData[i].first_name} ${filteredData[i].last_name}</td>
        <td>${filteredData[i].gender}</td>
        <td>${filteredData[i].class}</td>
        <td>${filteredData[i].marks}</td>
        <td>${filteredData[i].passing ? "Passed" : "Failed"}</td>
        <td>${filteredData[i].email}</td>
        `;
    tableBody.appendChild(tr);
  }
}


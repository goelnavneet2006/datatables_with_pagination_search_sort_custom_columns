function Datatable () {
  this.originalData = [];
  this.data = [];
  this.currentUIPage = 1;
  this.currentAPIPage = 1;
  this.apiPageSize = 100;
  this.uiPageSize = 10;
  this.apiURL = "https://api.github.com/search/repositories?q=language:javascript";
  this.lowestPageIndex = 1;
  this.highestPageIndex = 10;
  this.pageCount = 10;
  this.columns = {
    id: true,
    name: true,
    description: true,
    private: true,
    forks: true,
    size: true,
    watchers: true,
    created_at: true
  };
}

Datatable.prototype.setTableHeader = function () {
  var tableEle = document.getElementById("datatable_table");

  if (tableEle) {
    tableEle.innerHTML = "";
  } else {
    tableEle = document.createElement("table");
  }

  tableEle.id = "datatable_table";

  var captionEle = document.createElement("caption");
  captionEle.innerText = "Github JavaScript Repos";
  tableEle.appendChild(captionEle);

  var theadEle = document.createElement("thead");

  var tbodyEle = document.createElement("tbody");
  tbodyEle.id = "table_body";

  var trEle = document.createElement("tr");
  trEle.id = "datatable_head_row";

  if (this.columns.id) {
    var idThEle = document.createElement("th");
    idThEle.id = "id";
    idThEle.className = "noOrder";
    idThEle.innerText = "Id";
    trEle.appendChild(idThEle);
  }

  if (this.columns.name) {
    var nameThEle = document.createElement("th");
    nameThEle.id = "name";
    nameThEle.className = "noOrder";
    nameThEle.innerText = "Name";
    trEle.appendChild(nameThEle);
  }

  if (this.columns.description) {
    var descriptionThEle = document.createElement("th");
    descriptionThEle.id = "description";
    descriptionThEle.className = "noOrder";
    descriptionThEle.innerText = "Description";
    trEle.appendChild(descriptionThEle);
  }

  if (this.columns.private) {
    var privateThEle = document.createElement("th");
    privateThEle.id = "private";
    privateThEle.className = "noOrder";
    privateThEle.innerText = "Is private";
    trEle.appendChild(privateThEle);
  }

  if (this.columns.forks) {
    var forksThEle = document.createElement("th");
    forksThEle.id = "forks";
    forksThEle.className = "noOrder";
    forksThEle.innerText = "Forks";
    trEle.appendChild(forksThEle);
  }

  if (this.columns.size) {
    var sizeThEle = document.createElement("th");
    sizeThEle.id = "size";
    sizeThEle.className = "noOrder";
    sizeThEle.innerText = "Size";
    trEle.appendChild(sizeThEle);
  }

  if (this.columns.watchers) {
    var watchersThEle = document.createElement("th");
    watchersThEle.id = "watchers";
    watchersThEle.className = "noOrder";
    watchersThEle.innerText = "Watchers";
    trEle.appendChild(watchersThEle);
  }

  if (this.columns.created_at) {
    var createdAtThEle = document.createElement("th");
    createdAtThEle.id = "created_at";
    createdAtThEle.className = "noOrder";
    createdAtThEle.innerText = "Created";
    trEle.appendChild(createdAtThEle);
  }

  theadEle.appendChild(trEle);
  tableEle.appendChild(theadEle);
  tableEle.appendChild(tbodyEle);

  document.body.appendChild(tableEle);
};

Datatable.prototype.getData = function (callback) {
  var ajaxObj = new XMLHttpRequest();
  var that = this;
  ajaxObj.onreadystatechange = function () {
    if (ajaxObj.readyState == ajaxObj.DONE && ajaxObj.status == 200) {
      var data = JSON.parse(ajaxObj.responseText).items;
      that.data = that.data.concat(data);
      that.originalData = that.originalData.concat(data);
      if (typeof callback == "function") {
        callback();
      }
    }
  }
  ajaxObj.open("GET", this.apiURL.concat("&page=").
    concat(this.currentAPIPage++).concat("&per_page=").concat(this.apiPageSize));
  ajaxObj.send();
};


Datatable.prototype.setTableData = function () {
  if (this.data.length == 0) {
    document.getElementById("table_body").innerHTML = "";
  }

  var beginIndex = (this.currentUIPage - 1) * this.uiPageSize;
  var endIndex = beginIndex + this.uiPageSize;
  var that = this;

  if (this.data.length < (this.uiPageSize * this.currentUIPage)) {
    endIndex = this.data.length;
  }

  var finalRows = "";
  for (var i = beginIndex; i < endIndex; i++) {
    var trEle = document.createElement("tr");

    if (this.columns.id) {
      var idTdEle = document.createElement("td");
      idTdEle.innerText = that.data[i].id;
      trEle.appendChild(idTdEle);
    }

    if (this.columns.name) {
      var nameTdEle = document.createElement("td");
      nameTdEle.innerText = that.data[i].name;
      trEle.appendChild(nameTdEle);
    }

    if (this.columns.description) {
      var descriptionTdEle = document.createElement("td");
      descriptionTdEle.innerText = that.data[i].description;
      trEle.appendChild(descriptionTdEle);
    }

    if (this.columns.private) {
      var privateTdEle = document.createElement("td");
      privateTdEle.innerText = that.data[i].private;
      trEle.appendChild(privateTdEle);
    }

    if (this.columns.forks) {
      var forksTdEle = document.createElement("td");
      forksTdEle.innerText = that.data[i].forks;
      trEle.appendChild(forksTdEle);
    }

    if (this.columns.size) {
      var sizeTdEle = document.createElement("td");
      sizeTdEle.innerText = that.data[i].size;
      trEle.appendChild(sizeTdEle);
    }

    if (this.columns.watchers) {
      var watchersTdEle = document.createElement("td");
      watchersTdEle.innerText = that.data[i].watchers;
      trEle.appendChild(watchersTdEle);
    }

    if (this.columns.created_at) {
      var createdAtTdEle = document.createElement("td");
      createdAtTdEle.innerText = that.data[i].created_at;
      trEle.appendChild(createdAtTdEle);
    }

    finalRows += trEle.outerHTML;
  }
  document.getElementById("table_body").innerHTML = finalRows;
};

Datatable.prototype.setOnSortClick = function () {
  var tableHeadRow = document.getElementById("datatable_head_row");
  tableHeadRow.addEventListener("click", this.onSortClick.bind(this));
}

Datatable.prototype.resetOnSortClick = function () {
  var tableHeadRow = document.getElementById("datatable_head_row");
  tableHeadRow.removeEventListener("click", this.onSortClick.bind(this));
}

Datatable.prototype.resetHeadersImages= function (columnToSort) {
  var ascElements = document.querySelectorAll(".ascOrder");
  var descElements = document.querySelectorAll(".descOrder");

  if (columnToSort) {
    ascElements.forEach(function (ascElement) {
      if (columnToSort != ascElement) {
        ascElement.classList.remove("ascOrder");
      }
    });
    descElements.forEach(function (descElement) {
      if (columnToSort != descElement) {
        descElement.classList.remove("descOrder");
      }
    });
  } else {
    ascElements.forEach(function (ascElement) {
      ascElement.classList.remove("ascOrder");
    });
    descElements.forEach(function (descElement) {
      descElement.classList.remove("descOrder");
    });
  }
};

Datatable.prototype.onSortClick = function (event) {
  var columnToSort = event.target;

  this.resetHeadersImages(columnToSort);

  if (columnToSort.classList.contains("ascOrder")) {
    if (columnToSort.id != "created_at") {
      this.data.sort(function (a, b) {
        if (typeof a[columnToSort.id] == "number") {
          return b[columnToSort.id] > a[columnToSort.id] ? 1 : -1;
        } else {
          return (b[columnToSort.id] ? b[columnToSort.id].toLowerCase() : "") >
            (a[columnToSort.id] ? a[columnToSort.id].toLowerCase() : "") ? 1 : -1;
        }
      });
    } else {
      this.data.sort(function (a, b) {
        a = new Date(a[columnToSort.id]);
        b = new Date(b[columnToSort.id]);
        a = a.getTime();
        b = b.getTime();
        return b > a ? 1 : -1;
      });
    }
    columnToSort.classList.remove("ascOrder");
    columnToSort.classList.add("descOrder")
  } else {
    if (columnToSort.id != "created_at") {
      this.data.sort(function (a, b) {
        if (typeof a[columnToSort.id] == "number") {
          return a[columnToSort.id] > b[columnToSort.id] ? 1 : -1;
        } else {
          return (a[columnToSort.id] ? a[columnToSort.id].toLowerCase() : "") >
            (b[columnToSort.id] ? b[columnToSort.id].toLowerCase() : "") ? 1 : -1;
        }
      });
    } else {
      this.data.sort(function (a, b) {
        a = new Date(a[columnToSort.id]);
        b = new Date(b[columnToSort.id]);
        a = a.getTime();
        b = b.getTime();
        return a > b ? 1 : -1;
      });
    }
    columnToSort.classList.remove("descOrder");
    columnToSort.classList.add("ascOrder")
  }

  this.onDataLoad();
};

Datatable.prototype.setPagination = function () {
  var divEle = document.getElementById("datatable_pagination");

  if (divEle) {
    divEle.innerHTML = "";
  } else {
    divEle = document.createElement("div");
    divEle.id = "datatable_pagination";
  }

  if (this.data.length == 0) {
    divEle.innerHTML = "";
    document.body.appendChild(divEle);
    return;
  }

  var h4Ele = document.createElement("h4");
  h4Ele.innerText = "Pages: ";
  divEle.appendChild(h4Ele);

  var pageSetIndex = Math.floor(this.currentUIPage/this.pageCount);
  if (this.currentUIPage == this.lowestPageIndex && this.lowestPageIndex != 1) {
    pageSetIndex = Math.floor(this.currentUIPage/this.pageCount) - 1;
  }

  this.lowestPageIndex = this.pageCount * pageSetIndex;
  this.highestPageIndex = this.lowestPageIndex + this.pageCount;

  if (this.data.length < (this.pageCount * this.uiPageSize * (pageSetIndex + 1))) {
    this.highestPageIndex = Math.ceil(this.data.length/this.pageCount);
  }

  for (var i = this.lowestPageIndex; i <= this.highestPageIndex; i++) {
    if (i == 0) {
      continue;
    }
    var aEle = document.createElement("a");
    if (this.currentUIPage == i) {
      aEle.className = "pageLink selected";
    } else {
      aEle.className = "pageLink";
    }
    aEle.innerText = i;
    aEle.id = i;
    aEle.addEventListener("click", this.onPageUpdate.bind(this));
    divEle.appendChild(aEle);
  }

  document.body.appendChild(divEle);
};


Datatable.prototype.onPageUpdate = function (event) {
  var clickedPageLink = event.target;
  this.currentUIPage = clickedPageLink.id;

  if (clickedPageLink.id == this.data.length/this.uiPageSize) {
    this.resetHeadersImages();
    this.getData(this.onDataLoad.bind(this));
  } else {
    this.onDataLoad();
  }
};

Datatable.prototype.onDataLoad = function () {
  this.setTableData();
  this.setPagination();
};


Datatable.prototype.setSearch = function () {
  var divEle = document.createElement("div");
  divEle.className = "datatypeSearchContainer";

  var inputEle = document.createElement("input");
  inputEle.type = "text";
  inputEle.id = "datatype_search";
  inputEle.addEventListener("keyup", this.onSearch.bind(this));

  var labelEle = document.createElement("label");
  labelEle.setAttribute("for", inputEle.id);
  labelEle.innerText = "Search: "

  divEle.appendChild(labelEle);
  divEle.appendChild(inputEle);

  document.body.appendChild(divEle);
};

Datatable.prototype.onSearch = function (event) {
  var searchString = event.target.value;
  var that = this;

  this.data = this.originalData.filter(function(dataRow) {
    for (var key in dataRow) {
      if (Object.keys(that.columns).indexOf(key) > -1) {
        if (dataRow[key] && dataRow[key].toString().indexOf(searchString) > -1) {
          return true;
        }
      }
    }
  });

  this.resetHeadersImages();
  this.currentUIPage = 1;
  this.onDataLoad();
};

Datatable.prototype.displayColumns = function () {
  var divEle = document.createElement("div");
  divEle.id = "datatable_columns";

  var h4Ele = document.createElement("h4")
  h4Ele.innerText = "Select columns to display in table: ";
  h4Ele.id = "datatable_columns_info";
  divEle.appendChild(h4Ele);

  for (var key in this.columns) {
    var inputEle = document.createElement("input");
    inputEle.setAttribute("type", "checkbox");
    inputEle.checked = true;
    inputEle.id = "column_".concat(key);
    inputEle.addEventListener("change", this.toggleColumn.bind(this));

    var labelEle = document.createElement("label");
    labelEle.setAttribute("for", inputEle.id);
    labelEle.innerText = key;
    labelEle.className = "datatable_columns_labels";

    divEle.appendChild(inputEle);
    divEle.appendChild(labelEle);
  }

  document.body.appendChild(divEle);
};

Datatable.prototype.toggleColumn = function (event) {
  var columnId = event.target.id.replace("column_", "");
  this.columns[columnId] = !this.columns[columnId];

  this.setTableHeader();
  this.resetOnSortClick();
  this.setOnSortClick();
  this.onDataLoad();
};

Datatable.prototype.insertCSS = function () {
  var linkEle = document.createElement("link");
  linkEle.setAttribute("rel", "stylesheet");
  linkEle.href = "datatable.css";

  document.head.appendChild(linkEle);
}

Datatable.prototype.init = function () {
  this.insertCSS();
  this.displayColumns();
  this.setSearch();
  this.setTableHeader();
  this.setOnSortClick();
  this.getData(this.onDataLoad.bind(this));
}

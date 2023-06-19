var app = angular.module('myApp', []);
    //1. Phát triển controller
    app.controller('myCtrl', function($scope, $http){
        $scope.btnUpdate = true;
    //2. Khai báo hàm đọc data từ file JSON (Read - R)
        function getData() {
            $http.get("CarsDB.json")
            .then(function(rspt){
                $scope.studentLists = rspt.data;
            });
        }
    //3. Gọi hàm getData để load dữ liệu vào danh sách
        getData();
    //4. Add data
        $scope.addData = function (){
            var person = {
                no: $scope.studentLists.length + 1,
                student: $scope.personClass.student,
                course: $scope.personClass.course,
                birthday: $scope.personClass.birthday
            };
            alert("New Course is inserted into database successfull");
            $scope.studentLists.push(person);
            setDefault();
        }
    //5.Ghi chỉnh sửa data
        //5.1 Chọn data cần chỉnh sữa
        $scope.personClass = {};
        $scope.getRecord = function(person){
            $scope.personClass.no = person.no;
            $scope.personClass.student = person.student;
            $scope.personClass.course = person.course;
            $scope.personClass.birthday = person.birthday;
            $scope.btnUpdate = false;
            $scope.btnSave = true;
        }
        //5.2 Chỉnh sửa data để update
        $scope.updateData = function (){
            var msg = "Are you sure to update this record ?";
            $.grep($scope.studentLists, function(e){
                if(e.no == $scope.personClass.no){
                    if(confirm(msg)){
                        e.student = $scope.personClass.student;
                        e.course = $scope.personClass.course;
                        e.birthday = $scope.personClass.birthday;
                        $scope.btnUpdate = true;
                        $scope.btnSave = false;
                        setDefault();
                    }
                 }
            });
        }
    //6. Xóa (Delete data)
        $scope.deleteData = function (person){
            var msg = "Are you sure to delete this record ?";
            if(confirm(msg)){
                var index = $scope.studentLists.indexOf(person);
                $scope.studentLists.splice(index,1);
                setDefault();
            }
        }
    //7. Sort ( xắp sếp cot,hàng)
        $scope.doSort = function(col){
            $scope.field = col;
            if($scope.reverse){
                $scope.reverse = false;
            }else{
                $scope.reverse = true;
            }
        }
        //8. Ghi bộ nhớ data new
            function setDefault(){
                $scope.personClass.no = null;
                $scope.personClass.student = '';
                $scope.personClass.course = '';
                $scope.personClass.birthday = '';
            }
    });
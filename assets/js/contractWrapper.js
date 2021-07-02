var Organizations = [{ 'Name': 'madBlocks', 'Address': '0xeFD05b8Bce49597F1A9fbaF99827591C79A087B8', 'orgtype' : 2},
                     { 'Name': 'URCET Vijayawada', 'Address': '0x432AF9e7b49e5293144fC0618C5A4448E310dcCc', 'orgtype' : 2}
];

var userDocuments = [{ 'Name': 'Varshini', 'Address': '0x42B916533c23B9923D637C5516685B2f1d429c9c', 'DocHashes': 'Qmb65Gs9e7xsghJ9vVvxiHvjCNPUkEKpE28QRUGaBSj8DV,QmQ7kW5e1joihQKCPHtLJ5dk8jbfqiLKfX2hnpsj9j7MdJ,QmVZUBHe6DkVP23GpGbFtLtWAbToQn2kN34MgwZm67hrPc,QmWAFSxXyBvhK1q3ZWm8HPzq6wcEtGJiVXS7tGsoKX8gQp'},
                    { 'Name': 'Manasa', 'Address': '0xA6Eb848A0d3D07e9d20C536c7937f8407fcd6169', 'DocHashes': 'QmeH2nPvsDpnnErNtKPeynJFWFcciM4UB6yZxXLPvuztsS,QmbdgRMcGAdCzjQS7Vp6VzxTjhtYE5mWeNZYJZ8q2ogesT,QmduxrvMYucXBhkZWDJyuLsLJtrhSphm1c3mk5fTAjXEwp,QmcVg78b3S21rj6iasTTHqW7Nd7ch7wFXB7xfJmt61q4uE'},
                    { 'Name': 'Ramya',   'Address': '0x2F2B48465C96a2A92ddB0843F2a956d3Eb5cB1C0', 'DocHashes': 'QmXTzWW4ALZKSW5hj25bZ9eU2FpZC6PaXRAHNQSonDptZ7,Qmf5ZbdGX2bCRyRnufGHZNPSXoH794JFZmJ1uX8iWPGcGx,QmUhf2P5WFc8BpdwwqpcMT8kAimfMVjJYCG9A3kARfi33s,QmY9uV2JBcGxx3FxUHUZ2gCPkHsygztjVhBzYiy8vxkQeG'}
                   , { 'Name': 'Mohit',   'Address': '0x0D57368A8Aafb60B2c255Be5412617abF87CD9B0', 'DocHashes': 'QmYHgjS9ZUUBtmrk3gvmMphiENunhPLwdB4Ukqb4rdhSVT,QmPncgwMfLF6M8pqf5VGCAFjizMiaDiy5yAudwiTp3fWBZ,Qme5PtQ9bLsu8RumYzJQ9XU6NuaqYvNLuCxwBAk3w8Dxnk,QmVcgvn71zJE5CiTjq1sWeG3cWZ828ut28MxzShpBmC7CL'}
                    
                ];                    

localStorage.setItem('Organizations', JSON.stringify(Organizations));
localStorage.setItem('userDocuments', JSON.stringify(userDocuments));


/*

//Check KYC Status - done
$('#btnCheckStatus').click( function() {
    $("#lblResult").html("") ;
    madhu.contract.checkBgvStatus($("#ddSelectEmp option:selected").val(),(req,res)=>{
        if(res==0)
            $("#lblResult").html('Alert! Your BGV Request does not exist.');
        else if(res==1)
            $("#lblResult").html('BGV Status is <strong>Pending</strong>.');
        else if(res==2)
        $("#lblResult").html('Congrats! BGV Status is <strong>Approved</strong>.');
        else if(res==3)
            $("#lblResult").html('BGV Status is <strong>Rejected</strong>.');
        else 
            $("#lblResult").html('BGV Status is ' + res);
    })
});

//GetCustomerDetails - done
$('#btnGetDetails').click( function() {
    $("#lblResult").html("") ;
    madhu.contract.getUserBasicDetails($("#ddSelectEmp option:selected").val(),(req,res)=>{
        console.log(res);

        if(res != null)
        {
            var op = "<strong>Name :</strong> " + res[0] + "<br />";
            if(res[1]==0)
                op +=  "<strong>Status :</strong> Not Exist <br />";
            else if(res[1]==1)
                op +=  "<strong>Status :</strong> Pending <br />";
            else if(res[1]==2)
                op +=  "<strong>Status :</strong> Verified <br />";
            else 
                op +=  "<strong>Status :</strong> Rejected <br />";
            
            op +=  "<strong>Permanent Address :</strong> " + res[2] + "<br />";
            op +=  "<strong>Current Address :</strong> " + res[3] + "<br />";
            op +=  "<strong>Email :</strong> " + res[4] + "<br />";
            op +=  "<strong>Phone :</strong> " + res[5] + "<br />";         
            op +=  "<strong>reference Email :</strong> " + res[6] + "<br />";
            $("#lblResult").html(op) ;
        }
        else
        {
            $("#lblResult").html("You are not authorized to view Student details.");
        }
    })

    //Load Documents
    $("#dvLoadCustEduDocs").html("");
    $("#dvLoadCustEmpDocs").html("");
    $("#dvLoadCustPerDocs").html("");
    var retrievedUsers = JSON.parse(localStorage.getItem('userDocuments'));
    jQuery.each(retrievedUsers, function(index, item) {
        console.log(item);
        if(item.Address == $("#ddSelectEmp option:selected").val())
        {
            var docArr = item.DocHashes.split(',');
            jQuery.each(docArr, function(ind, doc) {
                console.log(contract);
                console.log(doc);
                    madhu.contract.getUserDocument($("#ddSelectEmp option:selected").val(),doc,(req,res)=>{
                        if(res && res[2] != 0)
                        {
                            $("#dvShowDetails").css("display","inline");
                            if(res[2]==1 && localStorage["LoggedInUserType"] == 2)
                            {
                                var op = "<div class='row'><div class='col-md-8'>";
                                op += "<a href='https://ipfs.io/ipfs/" + doc + "'"+ " target='_blank'>" +  res[0] + "</a></div>";
                                op += "<div class='col-md-2'><button class='btnGet' onclick='verifyDocument(this)' id='ver_" + doc + "'>Verify</button></div>";
                                op += "<div class='col-md-2'><button class='btnPost' onclick='rejectDocument(this)' id='rej_" + doc + "'>Reject</button></div>";
                                op += "</div><hr />";
                            }
                            else if(res[2]==1 && localStorage["LoggedInUserType"] == 1)
                            {
                                var op = "<div class='row'><div class='col-md-8'>";
                                op += "<a href='https://ipfs.io/ipfs/" + doc + "'"+ " target='_blank'>" +  res[0] + "</a></div>";
                                //op += "<div class='col-md-2'><button class='btnGet' onclick='verifyDocument(this)' id='ver_" + doc + "'>Verify</button></div>";
                                //op += "<div class='col-md-2'><button class='btnPost' onclick='rejectDocument(this)' id='rej_" + doc + "'>Reject</button></div>";
                                op += "</div><hr />";
                            }
                            else if(res[2]==2)
                            {
                                var op = "<div class='row'><div class='col-md-10'>";
                                op += "<a href='https://ipfs.io/ipfs/" + doc + "'"+ " target='_blank'>" +  res[0] + "</a>";
                                op += "</div><div class='col-md-2'>";
                                op += "<img src='assets/img/verified.png' alt='Verified Document' />";
                                op += "</div></div><hr />";
                            }

                            
                            if(res[1] == 0)
                            {
                               
                            }
                            else if (res[1] == 1)
                            {
                                $("#dvLoadCustEduDocs").append(op);
                            }
                            else if(res[1] == 2)
                            {
                                $("#dvLoadCustEmpDocs").append(op);
                            }
                            else
                            {
                                $("#dvLoadCustPerDocs").append(op);
                            }

                        }
                    })
            });
        }
  });
});

// done
function verifyDocument(e)
{
    var dochash  = e.id.substring(4);
    madhu.contract.verifyDocument($("#ddSelectEmp option:selected").val(),dochash,(req,res)=>{
        $("#lblResult").html("Document verified!!");
    })
      
} 

// done
function rejectDocument(e)
{
    var dochash  = e.id.substring(4);
    madhu.contract.rejectDocument($("#ddSelectEmp option:selected").val(),dochash,(req,res)=>{
        $("#lblResult").html("Document verified!!");
    })
} 

//Verify Customer - done
$('#btnVerifyCust').click( function() {
    $("#lblResult").html("") ;
    madhu.contract.verifyCustomer($("#ddSelectEmp option:selected").val(),(req,res)=>{
        $("#lblResult").html("Student verified!!");
    })
});

//Send KYC Request - done
$('#btnSendReq').click( function() {
    $("#lblResult").html("") ;
    madhu.contract.sendBgvRequest($("#ddSelectEmp option:selected").val(),(req,res)=>{
        $("#lblResult").html("BGV Request sent to Student. Wait for approval to view Student details.");
    })
});

//Approve KYC Request - done
$('#btnApproveKyc').click( function() {
    $("#lblResult1").html("") ;
    madhu.contract.approveBgvRequest($("#ddSelectEmployee option:selected").val(),$('#chkEdu').is(":checked"),$('#chkEmp').is(":checked"),$('#chkContact').is(":checked"), $('#chkRef').is(":checked"), $('#chkContact').is(":checked"), $('#chkAadhar').is(":checked"),$('#chkPan').is(":checked"),$('#chkDL').is(":checked"),(req,res)=>{
        $("#lblResult1").html("BGV Request Approved with given access.");
    })
});

//Reject KYC Request - done
$('#btnRejectKyc').click( function() {
    $("#lblResult1").html("") ;
    console.log($("#txtCustAddress").val());
    madhu.contract.rejectBgvRequest($("#ddSelectEmployee option:selected").val(),(req,res)=>{
        $("#lblResult1").html("BGV Request Rejected.");
    })
});

//Add Org - done
$('#btnAddOrg').click( function() {
    $("#lblResultAddOrg").html("") ;
    madhu.contract.addNewOrg($("#txtAddOrgAddress").val(),$("#txtAddOrgName").val(),2,(req,res)=>{
        $("#lblResultAddOrg").html(" Company Registered!!");
        localStorage["LoggedInUserType"] = 1; //Employer
        window.location.href="index.html";
    })


});

//Add Third Party Verification Org - done
$('#btnAddThird').click( function() {
    $("#lblResultAddOrg").html("") ;
    madhu.contract.addNewOrg($("#txtAddThirdAddress").val(),$("#txtAddThirdName").val(),6,(req,res)=>{
        $("#lblResultAddOrg").html(" Registered!!");
        localStorage["LoggedInUserType"] = 2; //TPVA
        window.location.href="index.html";
    })
});

//Add Customer - done
$('#btnAddCust').click( function() {
    $("#lblResultAddCust").html("") ;
    contract.addNewCustomer($("#txtAddCustAddress").val(),$("#txtAddCustName").val(),$("#txtCustPerAddress").val(),$("#txtCustCurAddress").val(),$("#txtCustEmail").val(),$("#txtCustPhone").val(),$("#txtCustRefEmail").val(),(req,res)=>{
        $("#lblResultAddCust").html("You are registered. Time to add your documents.");
        localStorage["LoggedInUserType"] = 0; //Users or Employees
        window.location.href="index.html";
    })
});

// done
function loadCustomerData()
{

    madhu.contract.getMyBasicDetails((req,res)=>{
        if(res != null)
        {
            $("#txtUpdateCustName").val(res[0]);
            $("#txtUpdatePerAddress").val(res[2]);
            $("#txtUpdateCurAddress").val(res[3]);
            $("#txtUpdateCustEmail").val(res[4]);
            $("#txtUpdateCustPhone").val(res[5]);
            $("#txtUpdateCustRefEmail").val(res[6]);
        }
    })

    //LoadMyDocuments
    $("#dvLoadMyEduDocs").html("");
    $("#dvLoadMyEmpDocs").html("");
    $("#dvLoadMyPerDocs").html("");
    var retrievedUsers = JSON.parse(localStorage.getItem('userDocuments'));
    jQuery.each(retrievedUsers, function(index, item) {
        console.log(item);
        if(item.Name == localStorage.getItem('LoggedInUserName'))
        {
            var docArr = item.DocHashes.split(',');
            jQuery.each(docArr, function(ind, doc) {
                console.log(contract);
                console.log(doc);
                    madhu.contract.getMyDocument(doc,(req,res)=>{
                        if(res && res[2] != 0)
                        {
                            var op = "<div class='row'><div class='col-md-10'>";
                            op += "<a href='https://ipfs.io/ipfs/" + doc + "'"+ " target='_blank'>" +  res[0] + "</a>";
                            op += "</div><div class='col-md-2'>";
                            if(res[2]==2)
                                op += "<img src='assets/img/verified.png' alt='Verified Document' />";
                            op += "</div></div><hr />";
                            
                            if(res[1] == 0)
                            {
                               
                            }
                            else if (res[1] == 1)
                            {
                                $("#dvLoadMyEduDocs").append(op);
                            }
                            else if(res[1] == 2)
                            {
                                $("#dvLoadMyEmpDocs").append(op);
                            }
                            else
                            {
                                $("#dvLoadMyPerDocs").append(op);
                            }

                        }
                    })
            });
        }
  });
}

//Customer : Get My Basic Details - done
$('#mnuProfile').click( function() {    
    loadCustomerData();
});

//Customer : Update My Details - done
$('#btnUpdateCust').click( function() {
    $("#lblResultUpdateProfile").html("") ;
    madhu.contract.updateCustomer($("#txtUpdateCustName").val(),$("#txtUpdatePerAddress").val(),$("#txtUpdateCurAddress").val(),$("#txtUpdateCustPhone").val(),$("#txtUpdateCustRefEmail").val(),(req,res)=>{
        $("#lblResultUpdateProfile").html("Details Updated");
    })
});

//Customer Initiate Verification Request - done
$('#btnInitiateVerification').click( function() {
    $("#lblResultAddDoc").html("") ;
    madhu.contract.InitiateVerificationRequest("0xD2a20C57EC25a96304c74B7bC17e8d499306935f",(req,res)=>{
        $("#lblResultAddDoc").html("Verification Request Initiated with the University.");
    })
});*/

//Sign Out
$('#mnuSignOut').click( function() {
    window.location.href="login.html";
});


/*
$(document).ready(function() {

    //Load Role Based Screen
    if( localStorage["LoggedInUserType"] == 0)
    {
        $("#mnuOrg").css("display","none");
        $("#mnuCust").css("display","block");
        $("#mnuProfile").css("display","block");
        $("#org").css("display","none");
        $("#customer").css("display","block");
        $("#custProfile").css("display","block");  
    }
    else if( localStorage["LoggedInUserType"] == 1)
    {
        $("#mnuOrg").css("display","block");
        $("#mnuCust").css("display","none");
        $("#mnuProfile").css("display","none");
        $("#org").css("display","block");
        $("#customer").css("display","none");
        $("#custProfile").css("display","none"); 

        $("#btnVerifyCust").css("display","none"); 
        $("#btnSendReq").css("display","block"); 
        $("#btnCheckStatus").css("display","block"); 
    }
    else if( localStorage["LoggedInUserType"] == 2)
    {
        $("#mnuOrg").css("display","block");
        $("#mnuCust").css("display","none");
        $("#mnuProfile").css("display","none");
        $("#org").css("display","block");
        $("#customer").css("display","none");
        $("#custProfile").css("display","none"); 

        $("#btnVerifyCust").css("display","block"); 
        $("#btnSendReq").css("display","none"); 
        $("#btnCheckStatus").css("display","none"); 
    }
    
    //Load Organizations drop down
    var retrievedOrg = JSON.parse(localStorage.getItem('Organizations'));
    
    jQuery.each(retrievedOrg, function(index, item) {
        if(item.orgtype == 2)
        {
            var opt = "<option value='" + item.Address + "'>" + item.Name + "</option>";
            $("#ddSelectEmployee").append(opt);
        }
    });

    //Load Emp drop down
    var retrievedOrg = JSON.parse(localStorage.getItem('userDocuments'));
    
    jQuery.each(retrievedOrg, function(index, item) {
       
            var opt = "<option value='" + item.Address + "'>" + item.Name + "</option>";
            $("#ddSelectEmp").append(opt);
       
    });

    //UploadDocuments
    $('#uploadDocument').submit(function() {
        console.log("1 - Submitted");
        $("#lblResultAddDoc").empty().text("Document is uploading...");
        $(this).ajaxSubmit({
            error: function(xhr) {
                 $("#lblResultAddDoc").empty().text('Error: ' + xhr.status);
            },
            success: function(response) {
             $("#lblResultAddDoc").empty().text("Document Uploaded.");
                console.log(response);
                console.log(response[0].hash);
                madhu.contract.addDocument($("#txtAddDocName").val(),"0xD2a20C57EC25a96304c74B7bC17e8d499306935f",$("#ddAddDocType option:selected").val(),response[0].hash,(req,res)=>{
                 $("#lblResultAddDoc").empty().text("Document Uploaded.");
             })
                 
            }
    });
        //Very important line, it disable the page refresh.
    return false;
    });  

    
});*/

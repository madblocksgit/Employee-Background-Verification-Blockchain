madhu = {

	web3Provider:null,
	contracts: {},

	init: async function() {

		return await madhu.initWeb3();
	},

	initWeb3: function() {

		if(window.web3) {
			madhu.web3Provider = window.web3.currentProvider; // asking the metamask to connect with web madhu
		}
		else {
			madhu.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
		}

		web3 = new Web3(madhu.web3Provider);
		console.log(web3);
		return madhu.initContract();
	},

	initContract: function() {

		$.getJSON('SDV.json',function(data){

			var registerArtifact = data;
			madhu.contracts.register = TruffleContract(registerArtifact);
			madhu.contracts.register.setProvider(madhu.web3Provider);
			console.log(madhu.contracts);

		});
			return madhu.bindEvents();
	},

	bindEvents: function() {

		$(document).on('click', '.btnstudreg', madhu.registerUser);
		$(document).on('click', '.btnAddOrg', madhu.registerOrg);
		$(document).on('click', '.btnAddThird',madhu.registerCollege);
		$(document).on('click', '.btnCheckStatus', madhu.btnCheckStatus);
		$(document).on('click', '.btnGetDetails', madhu.btnGetDetails);
		$(document).on('click', '.btnVerifyCust', madhu.btnVerifyCust);
		$(document).on('click', '.btnSendReq', madhu.btnSendReq);
		$(document).on('click', '.btnApproveKyc', madhu.btnApproveKyc);
		$(document).on('click', '.btnRejectKyc', madhu.btnRejectKyc);
		$(document).on('click', '#mnuProfile',madhu.mnuProfile);
		$(document).on('click', '.btnUpdateCust',madhu.btnUpdateCust);
		$(document).on('click', '.btnInitiateVerification',madhu.btnInitiateVerification);
		//$(document).on('click', '.verifyDocument',madhu.verifyDocument);
		//$(document).on('click', '.rejectDocument', madhu.rejectDocument);
	},
	
	loadCustomerData: function()
	{
		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			madhu.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.getMyBasicDetails.call();

			}).then(function(result){

				console.log(result);
				if(result != null)
				{
					$("#txtUpdateCustName").val(res[0]);
					$("#txtUpdatePerAddress").val(res[2]);
					$("#txtUpdateCurAddress").val(res[3]);
					$("#txtUpdateCustEmail").val(res[4]);
					$("#txtUpdateCustPhone").val(res[5]);
					$("#txtUpdateCustRefEmail").val(res[6]);
				}
			}).catch(function(err){
				
				console.log(err.message);
			});

		});

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
					
					web3.eth.getAccounts(function(error,accounts){
			
						if(error) {
							console.log(error);
						}

						var account=accounts[0];
						console.log(account);

						madhu.contracts.register.deployed().then(function(instance){
				
							registerInstance=instance;
							return registerInstance.getMyBasicDetails.call();

						}).then(function(res){

							console.log(res);
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
						}).catch(function(err){
				
							console.log(err.message);
					});

					});
				});
			}
		});
	},
	mnuProfile:function(event) {
		event.preventDefault();
		loadCustomerData();
	},

	registerUser: function(event) {
		event.preventDefault();

		var registerInstance;
		var txtAddCustAddress = document.getElementById('txtAddCustAddress').value;
		var txtAddCustName = document.getElementById('txtAddCustName').value;
		var txtCustPerAddress = document.getElementById('txtCustPerAddress').value;
		var txtCustCurAddress = document.getElementById('txtCustCurAddress').value;
		var txtCustEmail = document.getElementById('txtCustEmail').value;
		var txtCustPhone = document.getElementById('txtCustPhone').value;
		var txtCustRefEmail = document.getElementById('txtCustRefEmail').value;
		
		

		console.log(txtAddCustAddress);
		console.log(txtAddCustName);
		console.log(txtCustCurAddress);
		console.log(txtCustPerAddress);
		console.log(txtCustEmail);
		console.log(txtCustPhone);
		console.log(txtCustRefEmail);

		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			madhu.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.addNewCustomer(txtAddCustAddress,(txtAddCustName),(txtCustCurAddress),(txtCustPerAddress),(txtCustEmail),(txtCustPhone),(txtCustRefEmail),{from:account});

			}).then(function(result){

				console.log(result);
				/*window.location.reload(); */
				localStorage["LoggedInUserType"] = 0; //Student
				$("#lblResultAddCust").html("You are registered. Time to add your documents.");
				window.location.href="index.html";
			}).catch(function(err){
				
				console.log(err.message);
			});

		});
	},
	
	registerOrg: function(event) {
		event.preventDefault();

		var registerInstance;
		var txtAddOrgAddress = document.getElementById('txtAddOrgAddress').value;
		var txtAddOrgName = document.getElementById('txtAddOrgName').value;
			

		console.log(txtAddOrgAddress);
		console.log(txtAddOrgName);
		
		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			madhu.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.addNewOrg(txtAddOrgAddress,web3.fromAscii(txtAddOrgName),2,{from:account});

			}).then(function(result){

				console.log(result);
				
				$("#lblResultAddOrg").html(" Company Registered!!");
				localStorage["LoggedInUserType"] = 1; //Employer
				window.location.reload(); 
				
			}).catch(function(err){
				
				console.log(err.message);
			});

		});
	},
	
	registerCollege: function(event) {
		event.preventDefault();

		var registerInstance;
		var txtAddThirdAddress = document.getElementById('txtAddThirdAddress').value;
		var txtAddThirdName = document.getElementById('txtAddThirdName').value;
			

		console.log(txtAddThirdAddress);
		console.log(txtAddThirdName);
		
		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			madhu.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.addNewOrg(txtAddThirdAddress,web3.fromAscii(txtAddThirdName),6,{from:account});

			}).then(function(result){

				console.log(result);
				
				$("#lblResultAddThird").html(" College Registered!!");
				localStorage["LoggedInUserType"] = 2; //College
				window.location.reload(); 
				
			}).catch(function(err){
				
				console.log(err.message);
			});

		});
	},
	
	btnCheckStatus: function(event) {
		event.preventDefault();

		var registerInstance;
		var ddSelectEmp = $("#ddSelectEmp option:selected").val();
			
		console.log(ddSelectEmp);
	
		
		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			madhu.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.checkBgvStatus((ddSelectEmp),{from:account});

			}).then(function(res){

				console.log(res);
				
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
				
			}).catch(function(err){
				
				console.log(err.message);
			});

		});
	},
	
	btnGetDetails: function(event) {
		event.preventDefault();

		var registerInstance;
		var ddSelectEmp = $("#ddSelectEmp option:selected").val();
			
		console.log(ddSelectEmp);
	
		
		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			madhu.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.getUserBasicDetails((ddSelectEmp),{from:account});

			}).then(function(res){

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
				
			}).catch(function(err){
				
				console.log(err.message);
			});

		});
		
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
                //console.log(contract);
                console.log(doc);
				var registerInstance;
				
			
		
		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			madhu.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.getUserDocument($("#ddSelectEmp option:selected").val(),doc,{from:account});

			}).then(function(res){

				console.log(res);
				
				if(res && res[2] != 0)
                        {
                            $("#dvShowDetails").css("display","inline");
                            if(res[2]==1 && localStorage["LoggedInUserType"] == 2)
                            {
								console.log('hi');
                                var op = "<div class='row'><div class='col-md-8'>";
                                op += "<a href='http://localhost:8080/ipfs/" + doc + "'"+ " target='_blank'>" +  res[0] + "</a></div>";
                                op += "<div class='col-md-2'><button class='btnGet' onclick='verifyDocument(this)' id='ver_" + doc + "'>Verify</button></div>";
                                op += "<div class='col-md-2'><button class='btnPost' onclick='rejectDocument(this)' id='rej_" + doc + "'>Reject</button></div>";
                                op += "</div><hr />";
                            }
                            else if(res[2]==1 && localStorage["LoggedInUserType"] == 1)
                            {
                                var op = "<div class='row'><div class='col-md-8'>";
                                op += "<a href='http://localhost:8080/ipfs/" + doc + "'"+ " target='_blank'>" +  res[0] + "</a></div>";
                                op += "<div class='col-md-2'><button class='btnGet' onclick='verifyDocument(this)' id='ver_" + doc + "'>Verify</button></div>";
                                op += "<div class='col-md-2'><button class='btnPost' onclick='rejectDocument(this)' id='rej_" + doc + "'>Reject</button></div>";
                                op += "</div><hr />";
                            }
                            else if(res[2]==2)
                            {
                                var op = "<div class='row'><div class='col-md-10'>";
                                op += "<a href='http://localhost:8080/ipfs/" + doc + "'"+ " target='_blank'>" +  res[0] + "</a>";
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
				
			}).catch(function(err){
				
				console.log(err.message);
			});

		});
                    
            });
        }
		});
	},
	
	
	btnVerifyCust: function(event) {
		event.preventDefault();

		var registerInstance;
		var ddSelectEmp = $("#ddSelectEmp option:selected").val();
			
		console.log(ddSelectEmp);
	
		
		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			madhu.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.verifyCustomer((ddSelectEmp),{from:account});

			}).then(function(result){

				console.log(result);
				
				$("#lblResult").html("Student verified!!");
				
			}).catch(function(err){
				
				console.log(err.message);
			});

		});
	},
	
	btnSendReq: function(event) {
		event.preventDefault();

		var registerInstance;
		var ddSelectEmp = $("#ddSelectEmp option:selected").val();
			
		console.log(ddSelectEmp);
	
		
		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			madhu.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.sendBgvRequest((ddSelectEmp),{from:account});

			}).then(function(result){

				console.log(result);
				
				$("#lblResult").html("BGV Request sent to Student. Wait for approval to view Student details.");
				
			}).catch(function(err){
				
				console.log(err.message);
			});

		});
	},
	
	btnApproveKyc: function(event) {
		event.preventDefault();

		var registerInstance;
				
		var ddSelectEmployee= $("#ddSelectEmployee option:selected").val();
		var chkEdu= $('#chkEdu').is(":checked");
		var chkEmp= $('#chkEmp').is(":checked");
		var chkContact=$('#chkContact').is(":checked");
		var chkRef=$('#chkRef').is(":checked");
		var chkContact1=$('#chkContact').is(":checked");
		var chkAadhar=$('#chkAadhar').is(":checked");
		var chkPan=$('#chkPan').is(":checked");
		var chkDL=$('#chkDL').is(":checked");
			
		console.log(ddSelectEmployee);
		console.log(chkEdu);
		console.log(chkEmp);
		console.log(chkContact);
		console.log(chkRef);
		console.log(chkContact1);
		console.log(chkAadhar);
		console.log(chkPan);
		console.log(chkDL);
		
		
		
		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			madhu.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.approveBgvRequest((ddSelectEmployee),chkEdu,chkEmp,chkContact,chkRef,chkContact1,chkAadhar,chkPan,chkDL,{from:account});

			}).then(function(result){

				console.log(result);
				
				$("#lblResult1").html("BGV Request Approved with given access.");
				
			}).catch(function(err){
				
				console.log(err.message);
			});

		});
	},
	
	btnRejectKyc: function(event) {
		event.preventDefault();

		var registerInstance;
				
		var ddSelectEmployee= $("#ddSelectEmployee option:selected").val();
		
			
		console.log(ddSelectEmployee);
		
		
		
		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			madhu.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.rejectBgvRequest(web3.fromAscii(ddSelectEmployee),{from:account});

			}).then(function(result){

				console.log(result);
				
				$("#lblResult1").html("BGV Request Rejected.");
				
			}).catch(function(err){
				
				console.log(err.message);
			});

		});
	},
	
	btnUpdateCust: function(event) {
		event.preventDefault();

		var registerInstance;
				
		var txtUpdateCustName=$("#txtUpdateCustName").val();
		var txtUpdatePerAddress=$("#txtUpdatePerAddress").val();
		var txtUpdateCurAddress=$("#txtUpdateCurAddress").val();
		var txtUpdateCustPhone=$("#txtUpdateCustPhone").val();
		var txtUpdateCustRefEmail=$("#txtUpdateCustRefEmail").val();
		
			
		console.log(txtUpdateCustName);
		console.log(txtUpdatePerAddress);
		console.log(txtUpdateCurAddress);
		console.log(txtUpdateCustPhone);
		console.log(txtUpdateCustRefEmail);
		
	
		
		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			madhu.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.updateCustomer(web3.fromAscii(txtUpdateCustName),web3.fromAscii(txtUpdatePerAddress),web3.fromAscii(txtUpdateCurAddress),web3.fromAscii(txtUpdateCustPhone),web3.fromAscii(txtUpdateCustPhone),web3.fromAscii(txtUpdateCustRefEmail),{from:account});

			}).then(function(result){

				console.log(result);
				
				$("#lblResultUpdateProfile").html("Details Updated");
				
			}).catch(function(err){
				
				console.log(err.message);
			});

		});
	},
	
	verifyDocument: function(event)
	{
		event.preventDefault();
		var abcd = $("#ddSelectEmp option:selected").val();
		var dochash  = event.id.substring(4);
		var registerInstance;
		madhu.web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			madhu.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.verifyDocument(web3.fromAscii(abcd),dochash,{from:account});

			}).then(function(result){

				console.log(result);
				
				$("#lblResult").html("Document verified!!");
				
			}).catch(function(err){
				
				console.log(err.message);
			});

		});
	},

	rejectDocument: function(event)
	{
		event.preventDefault();
		var abcd = $("#ddSelectEmp option:selected").val();
		var dochash  = event.id.substring(4);
		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			madhu.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.rejectDocument(web3.fromAscii(abcd),dochash,{from:account});

			}).then(function(result){

				console.log(result);
				
				$("#lblResult").html("Document verified!!");
				
			}).catch(function(err){
				
				console.log(err.message);
			});

		});
	},
	
	btnInitiateVerification: function(event) {
		event.preventDefault();
		
		var ddInitiateReqSelectOrg = $("#ddInitiateReqSelectOrg option:selected").val();
		console.log(ddInitiateReqSelectOrg);

		var registerInstance;
				
			
		
		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			madhu.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.InitiateVerificationRequest(ddInitiateReqSelectOrg,{from:account});

			}).then(function(result){

				console.log(result);
				
				$("#lblResultAddDoc").html("Verification Request Initiated with the University.");
				
			}).catch(function(err){
				
				console.log(err.message);
			});

		});
	},
	
};

$(function() {
  $(window).load(function() {
    madhu.init();
	
	
	
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
			$("#ddInitiateReqSelectOrg").append(opt);
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
				
                var registerInstance;
				
			
		
		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			madhu.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.addDocument($("#txtAddDocName").val(),account,$("#ddAddDocType option:selected").val(),response[0].hash,({from:account}));

			}).then(function(result){

				console.log(result);
				
				$("#lblResultAddDoc").empty().text("Document Uploaded.");
				
			}).catch(function(err){
				
				console.log(err.message);
			});

		});
	}
				
                 
            
    });
        //Very important line, it disable the page refresh.
    return false;
    });  
  });
});

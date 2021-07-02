
# Employee Background Verification using Blockchain

# Softwares
1. Ganache Blockchain Server
2. Node.js
3. Metmask
4. IPFS 

# Process

1. Launch Ganache Server
2. Import the menomonic into the Metamask
3. Name your accounts (Admin, College, Company, Student1, Student2, Student3, Student4)
4. Clone the Project
5. Compile the Smart Contract
6. Migrate the Smart Contract
7. Copy the Artifact to the main folder
8. Run ipfs daemon on command prompt
9. Let us look at app.js
10. Let us create a small database (json) - you have to modify in ContractWrapper.js
11. Run app.js - node app.js
12. Open Browser, and open http://localhost:3031/login.html
13. Click on Register to Register Company, College, Student1
14. From Student1 login, you can upload the documents one by one
15. You have to raise request to the college
16. College has to verify through college account
17. Finally, the company has to send a request to student for viewing the documents
18. The student should accept the BGV request.
19. The company can able to view the status.
20. You can repeat this for Student 2, Student3 and Student 4

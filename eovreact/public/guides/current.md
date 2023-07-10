# Current Projects

## Deploy Static React Site to AWS EC2 via Docker-compose
This is the project that deploys the site we're looking at, so it is a bit of an inception process.  
To accomplish this, I have created a github repositiory in my account, bigjimnolan, and am using that to 
create a react based website capbable of rendering markdown documents, like the one we're reading. 

### Architecture (App)
The CI/CD for the application is as follows:
I update code on my IDE, commit to github and leverage github actions and terraform cloud
for the rest of the deployment step.

![Cloud Deploy](./guides/cloud-deploy.png)

Deploy Workflow (Dev Side)
* Update code and commit
* Build and run tests
* If commit is to main and succeeeds, kick off docker deploy to github container registry

Deploy Workflow (Site side)
* Listen for updates
* When a new docker image is published:
  * Re-run docker compose with new image reference.
  * Run integration/deployment tests.
  * Send alerts for issues, as needed.

### Architecture (Infrastruture) 
The infrastructure follows the same deployment path as the code using
github actions and terraform cloud.
* When a .tf file is updated:
  * Run Github action with TF cloud to plan for any updates to infrastructure.
  * Advise of potential changes and send alert that updates are needed.
  * Await manual approval.
  * Run updates.
  * Run integration/deployment tests.
  * send alerts for issues, as needed.


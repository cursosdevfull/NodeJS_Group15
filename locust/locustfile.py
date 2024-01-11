from locust import task, TaskSet, HttpLocust
import json

class UserBehavior_UserA(TaskSet):
    def on_start(self):
        response = self.client.post("/v1/auth/login", {"email": "sergio26@correo.com", "password": "Mundo2023"})
        self.token = response.json()["accessToken"]

    @task(10)
    def list_users(self):
        self.client.get("/v1/users", headers={"Authorization": "Bearer " + self.token})

    @task(2)
    def list_user_one(self):
        self.client.get("/v1/user/227b5c7c-35f4-44f5-af15-bbf508d24d23", headers={"Authorization": "Bearer " + self.token})

class UserBehavior_UserB(TaskSet):
    def on_start(self):
        response = self.client.post("/v1/auth/login", {"email": "sergio26@correo.com", "password": "Mundo2023"})
        self.token = response.json()["accessToken"]

    @task(3)
    def list_users(self):
        self.client.get("/v1/users", headers={"Authorization": "Bearer " + self.token})

    @task(5)
    def list_user_one(self):
        self.client.get("/v1/user/227b5c7c-35f4-44f5-af15-bbf508d24d23", headers={"Authorization": "Bearer " + self.token})        

class Test_UserA(HttpLocust):
    task_set = UserBehavior_UserA
    min_wait = 2000
    max_wait = 5000        

class Test_UserB(HttpLocust):
    task_set = UserBehavior_UserB
    min_wait = 3000
    max_wait = 4000    
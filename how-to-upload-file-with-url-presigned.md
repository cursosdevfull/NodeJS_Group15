# Upload file to S3 using url presigned

```
curl -X PUT -H "content-type=image/jpeg"  -T foto.jpg "https://nodejs15-images.s3.us-east-1.amazonaws.com/3e2ecc2d-6426-4b1f-9234-a8b473d6f239.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUDXASLVFCU4IQ4YJ%2F20231220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231220T020317Z&X-Amz-Expires=120&X-Amz-Signature=dbae9008dbbf9fa969749196c6be7a189c4d9ace501103b8c0e582e8ec6baffb&X-Amz-SignedHeaders=host&x-id=PutObject"
```

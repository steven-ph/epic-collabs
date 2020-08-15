# Buildkite

# IMPORTANT

When you receive an invite through Buildkite, ensure that your email is verified and that your account is connected to Github.

To do that, click on your avatar on the top right of the dashboard > Personal Settings > Connected Apps > Github > Connect.

If you do not correctly verify your email and connect to GitHub, your build WILL fail.

Information on our provisioned Buildkite instances & roles.

## Test account

**IAM Roles**

| Role | ARN                                           | Description |
| ---- | --------------------------------------------- | ----------- |
| TEST | `arn:aws:iam::12345:role/blah-buildkite-test` | deploy role |

## Buildkite account

**IAM Roles**

| Role                          | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| `buildkite-default-Role`      | created when provisioning buildkite default queue stack      |
| `buildkite-pull-request-Role` | created when provisioning buildkite pull-request queue stack |

**Policies**

Allows buildkite EC2 instances the ability to:

- assume role on other accounts
- access to S3 secrets and metadata buckets
- permission to update EC2 stack and autoscaling

ARN: `arn:aws:iam::12345:policy/BuildkiteEC2Policy`

**Github Webhooks**

| Pipeline     | Webhook                                     |
| ------------ | ------------------------------------------- |
| merge        | https://webhook.buildkite.com/deliver/12345 |
| pull-request | https://webhook.buildkite.com/deliver/12345 |

## Assume Buildkite role in AWS

Switch Role with the following settings:

```
Account: 12345-buildkite
Role: 12345-devs
DisplayName: BUILDKITE
```

import { AuthLayout } from "@/components/layout/auth-layout";
import { UserInput, useSignUpMutation } from "@/services/api/users";
import { setCredentials } from "@/services/auth";
import { Alert, Button, Divider, Form, Input } from "antd";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const SignUpPage: NextPage = () => {
  const router = useRouter();
  const { trigger: signUp } = useSignUpMutation();
  const [error, setError] = useState<string | null>(null);

  return (
    <AuthLayout heading="Sign Up">
      <Form
        layout="vertical"
        onFinish={async (user: UserInput) => {
          setError(null);

          try {
            await signUp(user);
            setCredentials({ username: user.email, password: user.password });
            await router.push("/");
          } catch (err: any) {
            if (err.response.status === 409)
              setError("User with this email already exists.");
            else setError("Something went wrong.");
          }
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ type: "email" }, { required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Full name" name="fullName">
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, min: 8 },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message: (
                <div>
                  <span>Password must contain at least:</span>
                  <ul>
                    <li>1 lowercase letter</li>
                    <li>1 uppercase letter</li>
                    <li>1 number</li>
                  </ul>
                </div>
              ),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator: (_, val) =>
                getFieldValue("password") === val
                  ? Promise.resolve()
                  : Promise.reject(new Error("Passwords have to match")),
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        {error && (
          <Form.Item status="error">
            <Alert
              message={error}
              type="error"
              closable
              onClose={() => setError(null)}
            />
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
          <Divider plain>or</Divider>
          <Link href="/auth/sign-in" legacyBehavior passHref>
            <Button block>Sign In</Button>
          </Link>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default SignUpPage;

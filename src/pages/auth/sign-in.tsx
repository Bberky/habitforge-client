import { AuthLayout } from "@/components/layout/auth-layout";
import { useGetLoggedUser } from "@/services/api/users";
import { setCredentials } from "@/services/auth";
import { Alert, Button, Divider, Form, Input, Spin } from "antd";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const SignInPage: NextPage = () => {
  const router = useRouter();
  const { mutate, isLoading } = useGetLoggedUser();
  const [error, setError] = useState<string | null>(null);

  return (
    <AuthLayout heading="Sign In">
      <Form
        layout="vertical"
        onFinish={async (auth) => {
          setError(null);
          setCredentials({ username: auth.email, password: auth.password });

          const user = await mutate();
          if (!!user) {
            router.push("/");
          } else setError("Wrong email or password.");
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ type: "email" }, { required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
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
          <Button type="primary" htmlType="submit" block disabled={isLoading}>
            {isLoading ? <Spin size="small" /> : "Sign In"}
          </Button>
          <Divider plain>or</Divider>
          <Link href="/auth/sign-up" legacyBehavior passHref>
            <Button block>Sign Up</Button>
          </Link>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default SignInPage;


import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="container py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem active>Iniciar Sesión</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="max-w-md mx-auto py-12">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

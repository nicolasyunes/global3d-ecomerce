
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <div className="container py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem active>Crear Cuenta</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="max-w-md mx-auto py-12">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;

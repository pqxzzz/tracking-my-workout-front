// // src/components/ProtectedLayoutWrapper.tsx
// "use client";

// import { Providers } from "@/context/providers";
// import { AuthProvider } from "@/context/AuthContext";
// import { AuthGate } from "@/components/gates/AuthGate";
// import { Header } from "@/components/Header/Header";
// import OnBoardingGate from "@/components/gates/OnBoardingGate";

// export function ProtectedLayoutWrapper({
//   children
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <Providers>
//       <AuthProvider>
//         <AuthGate>
//           <Header />
//           <OnBoardingGate />
//           {children}
//         </AuthGate>
//       </AuthProvider>
//     </Providers>
//   );
// }

import { StyleSheet } from "react-native";

// ---------------- REGISTER COMPONENT STYLES ----------------
export const RegisterStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
  },
  heading: {
    letterSpacing: 2,
    fontStyle: "italic",
    fontSize: 30,
    fontWeight: "800",
    color: "#000",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#000",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "500" },
  error: { color: "red", fontSize: 14, marginBottom: 8, fontWeight: "500" },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  linkText: { color: "#555", fontSize: 14, fontWeight: "600" },
  loginLink: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});

// ---------------- LOGIN COMPONENT STYLES ----------------
export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
  },
  heading: {
    letterSpacing: 2,
    fontStyle: "italic",
    fontSize: 30,
    fontWeight: "800",
    color: "#000",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#000",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "500" },
  error: { color: "red", fontSize: 14, marginBottom: 8, fontWeight: "500" },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  linkText: { color: "#555", fontSize: 14, fontWeight: "600" },
  loginLink: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});

// ---------------- Index COMPONENT STYLES ----------------
export const Indexstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
});

import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RegisterStyles as styles } from "@/styles/styles";
import axios, { AxiosError, AxiosResponse } from "axios";
import { RegisterForm, RegisterResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { registerSchema } from "@/zod/schema";
import { router } from "expo-router";

import React from "react";

export default function Register(): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  // ---------------- HANDLE REGISTER ----------------
  const handleRegister: (data: RegisterForm) => Promise<void> = async (
    data
  ) => {
    try {
      const res: AxiosResponse = await axios.post<RegisterResponse>(
        "<your-app-url>/api/register",
        data
      );

      // Save Token To Storage
      await AsyncStorage.setItem("token", res.data.token);

      Alert.alert("Success", "Your Account Has Been Created!", [
        {
          text: "OK",
          onPress: () => router.replace("/(protected)"),
        },
      ]);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>;
        Alert.alert(
          "Registration Failed",
          axiosError.response?.data?.message || "Something Went Wrong"
        );
      } else {
        Alert.alert("Unexpected Error", "Please Try Again Later.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>

      {/* NAME FIELD */}
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#888"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      {/* EMAIL FIELD */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* PASSWORD FIELD */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      {/* REGISTER BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleRegister)}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* LOGIN LINK */}
      <View style={styles.loginRow}>
        <Text style={styles.linkText}>Already Have An Account? </Text>

        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

package lordsahvith.java;

public class Main {

    public static void main(String[] args) {
        int myValue = 10000;

        int myMinIntValue = Integer.MIN_VALUE;
        int myMaxIntValue = Integer.MAX_VALUE;
        int myMaxIntTest = 2147483647; // if literal is 2147483648 IDE will throw error
        System.out.println("Integer minimum value = " + myMinIntValue);
        System.out.println("Integer maximum value = " + myMaxIntValue);
        System.out.println("Busted MAX value = " + (myMaxIntValue + 1)); // overflow
        System.out.println("Busted MIN value = " + (myMinIntValue - 1)); // underflow
    }
}

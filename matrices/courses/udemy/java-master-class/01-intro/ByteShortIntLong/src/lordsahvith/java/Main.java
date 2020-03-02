package lordsahvith.java;

public class Main {

    public static void main(String[] args) {
        // byte = 8 bits of memory
        byte myMinByteValue = Byte.MIN_VALUE;
        byte myMaxByteValue = Byte.MAX_VALUE;
        System.out.println("Byte min value = " + myMinByteValue);
        System.out.println("Byte max value = " + myMaxByteValue);

        // short = 16 bits of memory
        short myMinShortValue = Short.MIN_VALUE;
        short myMaxShortValue = Short.MAX_VALUE;
        System.out.println("Short min value = " + myMinShortValue);
        System.out.println("Short max value = " + myMaxShortValue);

        // int = 32 bits of memory
        int myIntValue = 10000;
        int myMinIntValue = Integer.MIN_VALUE;
        int myMaxIntValue = Integer.MAX_VALUE;
        int myMaxIntTest = 2147483647; // if literal is 2147483648 IDE will throw error
        System.out.println("Integer minimum value = " + myMinIntValue);
        System.out.println("Integer maximum value = " + myMaxIntValue);
        System.out.println("Busted MAX value = " + (myMaxIntValue + 1)); // overflow when you go greater than biggest number
        System.out.println("Busted MIN value = " + (myMinIntValue - 1)); // underflow when you go less than smallest number

        long myLongValue = 100L;
        long myMinLongValue = Long.MIN_VALUE;
        long myMaxLongValue = Long.MAX_VALUE;
        System.out.println("Long min value = " + myMinLongValue);
        System.out.println("Long max value = " + myMaxLongValue);
    }
}

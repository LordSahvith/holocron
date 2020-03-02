package lordsahvith.java;

public class Main {

    public static void main(String[] args) {
        // float = 32 bits (width of 32) also known as single precision
        float myMinFloatValue = Float.MIN_VALUE;
        float myMaxFloatValue = Float.MAX_VALUE;
        System.out.println("Float min value = " + myMinFloatValue);
        System.out.println("Float max value = " + myMaxFloatValue);

        // double = 64 bits (width of 64) also known as double precision
        double myMinDoubleValue = Double.MIN_VALUE;
        double myMaxDoubleValue = Double.MAX_VALUE;
        System.out.println("Double min value = " + myMinDoubleValue);
        System.out.println("Double max value = " + myMaxDoubleValue);

        // examples
        float myFloatExampleValue = 5.25f; // requires f to tell java it's a float (best)
        float myFloatExampleValue2 = (float) 5.25; // or you can cast it (not conventional)
        double myDoubleExampleValue2 = 5.25; // double is default to java
        double myDoubleExampleValue = 5.25d; // 'd' is optional (best)

        int myIntValue = 5;
        float myFloatValue = 5f; // floats aren't used as often
        double myDoubleValue = 5d; // doubles run faster due to how computers are built

        System.out.println("Int value = " + myIntValue);
        System.out.println("Float value = " + myFloatValue);
        System.out.println("Double value = " + myDoubleValue);
        System.out.println("New Int value (" + myIntValue + " / 2) = " + myIntValue / 2f);
        System.out.println("New Float value (" + myFloatValue + " / 2) = " + myFloatValue / 2f);
        System.out.println("New Double value (" + myDoubleValue + " / 2) = " + myDoubleValue / 2f);
        System.out.println("New Int value (" + myIntValue + " / 3) = " + myIntValue / 3d);
        System.out.println("New Float value (" + myFloatValue + " / 3) = " + myFloatValue / 3d);
        System.out.println("New Double value (" + myDoubleValue + " / 3) = " + myDoubleValue / 3d);
    }
}

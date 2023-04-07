// Fill out your copyright notice in the Description page of Project Settings.


#include "MovingPlatform.h"

// Sets default values
AMovingPlatform::AMovingPlatform()
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

}

// Called when the game starts or when spawned
void AMovingPlatform::BeginPlay()
{
	Super::BeginPlay();

	StartLocation = GetActorLocation();

	FString ActorName = GetName();

	UE_LOG(LogTemp, Display, TEXT("%s Configured Move Distance: %f"), *ActorName, MoveDistance);		
}

// Called every frame
void AMovingPlatform::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

	// Move platform forward
		// get current location
	FVector CurrentLocation = GetActorLocation();
		// add vector to that location
	CurrentLocation = CurrentLocation + (PlatformVelocity * DeltaTime);
		// set the location
	SetActorLocation(CurrentLocation);
	// send the platform back if gone too far
		// check how far we've moved
	float DistanceMoved = FVector::Distance(StartLocation, CurrentLocation);
		// reverse direction of motion if gone too far
	if (DistanceMoved > MoveDistance) 
	{
		float OverShoot = DistanceMoved - MoveDistance;
		FString ActorName = GetName();
		UE_LOG(LogTemp, Display, TEXT("%s overshot by: %f"), *ActorName, OverShoot);

		FVector MoveDirection = PlatformVelocity.GetSafeNormal();
		StartLocation = StartLocation + (MoveDirection * MoveDistance);
		SetActorLocation(StartLocation);
		PlatformVelocity = -PlatformVelocity;
	}

}


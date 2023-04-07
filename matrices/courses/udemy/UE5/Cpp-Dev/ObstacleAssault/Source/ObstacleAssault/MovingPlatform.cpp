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
	
}

// Called every frame
void AMovingPlatform::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

	// Move platform forward
		// get current location
	FVector CurrentLocation = GetActorLocation();
		// add vector to that location
	CurrentLocation.Y = CurrentLocation.Y + 1;
		// set the location
	SetActorLocation(CurrentLocation);
	// send the platform back if gone too far
		// check how far we've moved
		// reverse direction of motion if gone too far

}


'use client'

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { setLocalStorage, getLocalStorage } from '../utils/localStorage';

// Sample cat breeds data
const initialCatBreeds = [
  'Siamese', 'Persian', 'Maine Coon', 'Sphynx', 'Bengal', 
  'British Shorthair', 'Scottish Fold', 'Ragdoll', 'Russian Blue', 'Abyssinian'
];

export default function CatBreedSorter() {
  const [catBreeds, setCatBreeds] = useState<string[]>([]);

  useEffect(() => {
    const savedBreeds = getLocalStorage('catBreeds', initialCatBreeds);
    setCatBreeds(savedBreeds);
  }, []);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(catBreeds);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCatBreeds(items);
    setLocalStorage('catBreeds', items);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sort Cat Breeds by Preference</h1>
      <p className="mb-4">Drag and drop to reorder the cat breeds based on your preference.</p>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="catBreeds">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {catBreeds.map((breed, index) => (
                <Draggable key={breed} draggableId={breed} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white p-4 rounded shadow"
                    >
                      {breed}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}


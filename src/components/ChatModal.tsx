import React, { useState } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea } from "@nextui-org/react";
import { getAnswer } from '../services/gemini-service';
import ReactMarkdown from "react-markdown";

async function getGeminiResponse(prompt: string): Promise<string> {
  const question: any = { prompt };
  const response = await getAnswer(question);

  if (!response) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.response;
}

function GeminiButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => {
    setIsOpen(true);
    setPrompt('');
    setResponse(null);
    setError(null);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const geminiResponse = await getGeminiResponse(prompt);
      setResponse(geminiResponse);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button color="primary" onPress={handleOpen}>Ask Gemini</Button>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <ModalHeader>Ask Gemini</ModalHeader>
          <ModalBody>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your question..."
              minRows={3}
            />
            {error && <p className="text-red-500">Error: {error}</p>}
            {response && <div><h3 className="font-bold">Response:</h3><p><ReactMarkdown>{response}</ReactMarkdown></p></div>}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleClose}>Close</Button>
            <Button color="primary" onPress={handleSubmit} isLoading={loading}>
              {loading ? 'Loading...' : 'Submit'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GeminiButton;
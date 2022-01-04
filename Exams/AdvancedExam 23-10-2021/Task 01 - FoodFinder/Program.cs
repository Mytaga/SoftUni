using System;
using System.Collections.Generic;
using System.Linq;

namespace AdvancedExam
{
    class Program
    {
        static void Main(string[] args)
        {
            Queue<char> vowels = new Queue<char>(Console.ReadLine().Split(" ", StringSplitOptions.RemoveEmptyEntries).Select(char.Parse).ToArray());
            Stack<char> consonants = new Stack<char>(Console.ReadLine().Split(" ", StringSplitOptions.RemoveEmptyEntries).Select(char.Parse).ToArray());

            //• "pear"
            //•	"flour"
            //•	"pork"
            //•	"olive"
            Dictionary<string, string> words = new Dictionary<string, string>();
            words.Add("pear", "");
            words.Add("flour", "");
            words.Add("pork", "");
            words.Add("olive", "");

            while (consonants.Count > 0)
            {
                char currentVowel = vowels.Peek();
                char currentConsonant = consonants.Peek();

                if ("pear".Contains(currentVowel) && !words["pear"].Contains(currentVowel))
                {
                    words["pear"] += currentVowel;
                }

                if ("flour".Contains(currentVowel) && !words["flour"].Contains(currentVowel))
                {
                    words["flour"] += currentVowel;
                }

                if ("pork".Contains(currentVowel) && !words["pork"].Contains(currentVowel))
                {
                    words["pork"] += currentVowel;
                }

                if ("olive".Contains(currentVowel) && !words["olive"].Contains(currentVowel))
                {
                    words["olive"] += currentVowel;
                }
                if ("pear".Contains(currentConsonant) && !words["pear"].Contains(currentConsonant))
                {
                    words["pear"] += currentConsonant;
                }

                if ("flour".Contains(currentConsonant) && !words["flour"].Contains(currentConsonant))
                {
                    words["flour"] += currentConsonant;
                }

                if ("pork".Contains(currentConsonant) && !words["pork"].Contains(currentConsonant))
                {
                    words["pork"] += currentConsonant;
                }

                if ("olive".Contains(currentConsonant) && !words["olive"].Contains(currentConsonant))
                {
                    words["olive"] += currentConsonant;
                }

                vowels.Dequeue();
                vowels.Enqueue(currentVowel);
                consonants.Pop();
            }

            List<string> foundWords = new List<string>();

            foreach (var word in words)
            {
                if (word.Value.Length != word.Key.Length)
                {
                    words.Remove(word.Key);
                }
            }

            Console.WriteLine($"Words found: {words.Count}");

            foreach (var word in words)
            {
                Console.WriteLine(word.Key);
            }
        }
    }
}
